import { logger } from "$lib/consts/application_general";
import {
  buisnessCollection,
  dataCollection,
  dataDoc,
  multiEventsTimesDoc,
  publicCustomersDataDoc,
  recurrenceEventsDoc,
  workersCollection,
} from "$lib/consts/db";
import { SubType } from "$lib/consts/purchases";
import BookingController from "$lib/controllers/booking_controller";
import AppErrorsHelper from "$lib/helpers/app_errors";
import DbPathesHelper from "$lib/helpers/db_paths_helper";
import GeneralRepo from "$lib/helpers/general/general_repo";
import { GeneralData } from "$lib/helpers/general_data";
import ThemeHelper from "$lib/helpers/theme_helper";
import { BusinessData } from "$lib/models/business/business_data";
import { BusinessDesign } from "$lib/models/business/business_design";
import BusinessModel from "$lib/models/business/business_model";
import WorkerModel from "$lib/models/worker/worker_model";
import { businessStore } from "$lib/stores/Business";
import { userStore } from "$lib/stores/User";
import { workersStore } from "$lib/stores/Workers";
import { checkForReminders } from "$lib/utils/booking_utils";
import { subTypeFromProductId } from "$lib/utils/subscription_utils";
import { dateIsoStr } from "$lib/utils/times_utils";
import {
  Timestamp,
  type DocumentData,
  type DocumentSnapshot,
} from "firebase/firestore";
import UserInitializer from "./user_initializer";

export default class BusinessInitializer {
  private static instance: BusinessInitializer;

  private constructor() {}

  public static GI(): BusinessInitializer {
    if (!BusinessInitializer.instance) {
      BusinessInitializer.instance = new BusinessInitializer();
    }

    return BusinessInitializer.instance;
  }

  generalRepo: GeneralRepo = new GeneralRepo();
  activeBusiness: boolean = false;

  loadedBusinessJson: Record<string, any> | undefined;

  business: BusinessModel = new BusinessModel({
    businessId: "",
    design: new BusinessDesign(),
  }); // hold app settings (server settings)

  workers: Record<string, WorkerModel> = {};

  businessIcon: string = "";

  businessSubtype: SubType = SubType.trial;

  initBusiness(businessId: string): boolean {
    try {
      //businessSubtype = SubType.trial;
      this.workers = {};
      //   changingImages = [];
      //   storyCacheImages = {};
      //   productsCacheImages = [];
      //   limitionPassed = [];
      //   eligibleWorkerAmount = 0;
      //   storyImagesLength = 0;
      //   this.business.businessId = businessId;
      GeneralData.currentBusinesssId = businessId;
      // Use the current business in the user provider for comfort
      //   UserInitializer.GI().currentBusiness = businessId;
      //makeLongTimeNoSeeAlert();
      // --------------------------------------

      //parse the loaded business
      const businessResp = this._loadSettingsDoc(businessId);
      if (!businessResp) {
        return false;
      }
      //get the workers of the business no need to wait for
      this._loadBusinessWorkers(businessId);

      // Update the subtype before continuing to the rest of the loading
      this.businessSubtype = subTypeFromProductId(
        this.business.productId,
        businessId
      );

      this.activeBusiness = this.isBusinessActive();

      // Make the business data listener from the real-time database
      this.makeBusinessDataListener();

      //   // Can't initialize user data; the user may not be loaded if it's from loading
      //   if (!fromLoading && UserInitializer.GI().isConnected) {
      //     logger.d("Load the user data only when the user is already loaded");
      //     initialBusinessDataOnUser(businessId);
      //   }

      return true;
    } catch (e) {
      //this.emptyBusinessData();
      logger.error(`Error while initializing settings --> ${e}`);
      return false;
    }
  }

  loadBusiness(businessId: string): boolean {
    // Clean business data

    // BusinessUIController.getInstance().changingPhotoIndex = 0;
    // SearchUIController.getInstance().searchController.text = "";
    // SearchUIController.getInstance().searchTapped.value = false;
    // BusinessInitializer.getInstance().emptyBusinessData();
    // UserInitializer.getInstance().currentBusiness = "";

    try {
      // Initialize settings
      const resp = this.initBusiness(businessId);

      //   if (!resp) {
      //     BusinessInitializer.GI().emptyBusinessData();
      //     SearchUIController.getInstance().initialTheSearchCache(businessId);
      //     UserInitializer.GI().deleteVisitedBusiness(businessId, {
      //       context,
      //       deletePermanently: true,
      //     });
      //     return false;
      //   }

      // Check for reminders in this current business
      checkForReminders().then((value) => {
        UserInitializer.GI().user.userPublicData.reminders = value;
        userStore.set(UserInitializer.GI().user);
      });

      // We don't want to initialize the business when the theme is changed
      if (!ThemeHelper.GI().themeCauseMainBuilt) {
        // BusinessUIController.getInstance().businessInit = false;
      }

      // Save the last business - no need to await
      // BusinessInitializer.GI().updateLastBusiness(businessId);
      //logger.d(`The new business theme --> ${BusinessInitializer.GI().business.design.pickedThemeKey}`);

      //   for (const [themeKey, theme] of Object.entries(
      //     BusinessInitializer.GI().business.design.businessThemes
      //   )) {
      //     ThemeHelper.getInstance().currentThemes[themeKey] =
      //       BusinessTheme.fromBusinessTheme(theme);
      //   }

      //   /* No need to handle the overlay; it will change
      //     when the business is fully loaded */
      //   ThemeHelper.getInstance().changeTheme(
      //     BusinessInitializer.getInstance().business.design.pickedThemeKey,
      //     { needOverlayHandling: !fromSearch }
      //   );

      return true;
    } catch (e) {
      // Empty business data - no need to await for device cache deletion
      this.emptyBusinessData();
      if (e instanceof Error) {
        AppErrorsHelper.GI().details = e.message;
      }
      logger.error(`Error loading settings --> ${e}`);

      return false;
    }
  }

  ///NOTICE: this func run on the server
  async getBusinessDocByQuery(
    businessUrl: string
  ): Promise<Record<string, any> | undefined> {
    const docs = await this.generalRepo.getDocWithQueryRepo({
      path: buisnessCollection,
      queryList: [["urlEndPoint", "==", businessUrl]],
      limit: 1,
    });

    if (docs.length === 0) {
      return undefined;
    }
    if (docs[0].data() == null) {
      return undefined;
    }
    return {
      businessId: docs[0].id,
      business: this.fixBusinessDoc(docs[0].data()!),
    };
  }

  ///NOTICE: this func run on the server
  async getBusinessDocById(
    businessId: string
  ): Promise<Record<string, any> | undefined> {
    const doc = await this.generalRepo.getDocRepo({
      path: buisnessCollection,
      docId: businessId,
    });

    return {
      businessId: doc.id,
      business: this.fixBusinessDoc(doc.data()!),
    };
  }

  //we need to return the business doc from the server and cant return object that cant be stringify
  //so remove all the timestamp from the doc and replace them with strings
  fixBusinessDoc(
    businessDoc: Record<string, any> | undefined
  ): Record<string, any> | undefined {
    if (businessDoc == null) {
      return undefined;
    }

    //dix the product that on design obj

    let products: Record<string, any>;

    products =
      businessDoc["design"] != null
        ? { ...(businessDoc["design"]["products"] ?? {}) }
        : { ...(businessDoc["products"] ?? {}) };

    //if the design exist in the doc no need the other products
    if (businessDoc["design"] != null) {
      delete businessDoc["products"];
    }

    Object.entries(products).forEach(([productId, productJson]) => {
      const createdAt = productJson["createdAt"];
      if (createdAt instanceof Timestamp) {
        businessDoc["design"]["products"][productId]["createdAt"] = dateIsoStr(
          createdAt.toDate()
        );
      }
    });

    //fix the business created at if it is timestamp
    if (businessDoc["createdAt"] instanceof Timestamp) {
      businessDoc["createdAt"] = dateIsoStr(businessDoc["createdAt"].toDate());
    }

    return businessDoc;
  }

  isBusinessActive(): boolean {
    const ownerPhone = this.business.businessId.split("--")[0];
    if (GeneralData.developers[ownerPhone] != null) {
      this.business.productId =
        GeneralData.developers[ownerPhone]!.businessProductId;
      this.business.workersProductsId =
        GeneralData.developers[ownerPhone]!.workersProductId;
      return true;
    }

    /*Give to the user month trial without put the cerdit card*/
    if (this.business.expiredDate > new Date()) {
      return true;
    }
    return this.business.productId != "";
  }
  async _loadSettingsDoc(businessId: string): Promise<boolean> {
    try {
      //get the loaded doc of the business idf exist
      if (this.loadedBusinessJson == null) {
        return false;
      }

      this.business = BusinessModel.fromJson(
        this.loadedBusinessJson,
        businessId
      );
      businessStore.set(this.business);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Error while loading the settings doc --> ${e}`);
        logger.error(e.stack);
      }

      return false;
    }
  }

  async _loadBusinessWorkers(businessId: string): Promise<boolean> {
    try {
      const workersPath = `${buisnessCollection}/${businessId}/${workersCollection}`;

      const workersJsonsList =
        await this.generalRepo.getAllDocsInsideCollection(workersPath);

      if (workersJsonsList !== null) {
        workersJsonsList.forEach((workerJson: Record<string, any>) => {
          const workerObj = WorkerModel.fromWorkerDocJson(workerJson);

          // cacheStoryImages(workerObj.storyImages, workerObj.id);
          // storyImagesLength += workerObj.storyImages.length;

          if (
            UserInitializer.GI().getPermission > 1 ||
            workerObj.id === UserInitializer.GI().user.id
          ) {
            //makeWorkerDocListener(workerObj);
          }

          this.workers[workerObj.id] = workerObj;
          workersStore.set(this.workers);
        });
      }

      return true;
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Error while loading the business workers docs --> ${e}`);
        logger.error(e.stack);
      }

      return true;
    }
  }
  async loadLikes(likesToLoad: Record<string, StoryImageData>): Promise<void> {
    /* likesToLoad = {imageId : workerId} */
    const futures: Promise<void>[] = [];
    for (const [imageId, imageData] of Object.entries(likesToLoad)) {
      if (this.workers[imageData.workerId]!.storylikesAmount[imageId] != null) {
        continue;
      }
      futures.push(
        this.generalRepo
          .getChild({
            childPath: DbPathesHelper.GI().getLikesChildPath(
              imageData.workerId,
              this.business.businessId,
              imageId
            ),
          })
          .then(async (likesSnapshot) => {
            const likes = likesSnapshot.val();
            this.workers[imageData.workerId]!.storylikesAmount[imageId] =
              (likes as number) ?? 0;
            workersStore.set(this.workers);
          })
      );
    }
    // load all the futures
    await Promise.all(futures);
  }

  async makeBusinessDataListener() {
    const businessDataPath = DbPathesHelper.GI().getBusinessDataPath(
      GeneralData.currentBusinesssId
    );
    this.business.businessData.listener = this.generalRepo.listenToChild({
      childPath: businessDataPath,
      callback: (snapshot) => {
        if (snapshot.exists()) {
          this.business.businessData.setBusinessData(snapshot);
        }
      },
    });
  }
  async cancelBusinessDataListener() {
    try {
      if (this.business.businessData.listener != null) {
        this.business.businessData = new BusinessData();
        this.business.businessData.listener!();
      }
    } catch (e) {
      logger.debug("Error while cancel the business data listener");
    }
  }

  emptyBusinessData(): void {
    this.businessSubtype = SubType.trial;
    this.business = BusinessModel.empty();
    this.business.businessData = new BusinessData();

    // No need to wait
    this.cancelBusinessDataListener();
    GeneralData.currentBusinesssId = "";
    businessStore.set(new BusinessModel({}));
  }

  //---------------------------------------listeners --------------------------------------

  startWorkerListening(worker: WorkerModel): void {
    // const updateTitle =
    //   translate("realTimeUpdateRecivedTitle", { needGender: false }) + "!";
    // const updateContet = translate("realTimeUpdateRecived", {
    //   needGender: false,
    // });
    // let workerDocUpdates = 0;
    // firstTimeListenToWorkerDoc = true;

    try {
      console.log("cjdoscijdsoicdos");
      if (!worker.workerDocListner) {
        console.log("cjdoscijdsoge2542353454");
        // Make a listener for the worker object doc
        worker.workerDocListner = this.generalRepo.docListenerRepo({
          path: `${buisnessCollection}/${this.business.businessId}/${workersCollection}`,
          docId: worker.id,
          onChanged: (workerListenerJson) => {
            // workerDocUpdates++;

            // if (workerDocUpdates > 2) {
            //   new TopOverlyNotification({
            //     title: updateTitle,
            //     content: updateContet,
            //   }).show();
            // }

            this.updateWorkerObj(workerListenerJson, worker.id);
          },
        });
      }

      // Get the customer public to get data on the customer
      if (worker.publicCustomers.publicCustomersData === null) {
        this.generalRepo
          .getDocRepo({
            path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${worker.id}/${dataCollection}`,
            docId: publicCustomersDataDoc,
          })
          .then((json) => {
            if (json.exists() && json.data() !== null) {
              worker.publicCustomers.setPublicCustomersDataJson(json.data()!);
            }
          });
      }
    } catch (e) {
      console.error(`Error while resuming the Worker listener --> ${e}`);
    }
  }

  updateWorkerObj(
    workerListenerJson: DocumentSnapshot<DocumentData, DocumentData>,
    workerId: string
  ): void {
    if (workerListenerJson.exists()) {
      if (!Object.keys(this.workers).includes(workerId)) {
        return;
      }
      this.workers[workerId].setFromWorkerDoc(workerListenerJson.data()!);
      // Update the worker inside the booking provider
      BookingController.updateWorkerData(this.workers[workerId]!);
    } else {
      delete this.workers[workerId];
      return;
    }
  }

  cancelAllWorkersRegularListenings(override: boolean = false) {
    Object.values(this.workers).map(async (worker) => {
      try {
        if (
          override ||
          (worker.id !== UserInitializer.GI().user.id &&
            UserInitializer.GI().getPermission < 2)
        ) {
          if (worker.workerDocListner != undefined) {
            worker.workerDocListner();
            worker.workerDocListner = undefined;
          }

          if (worker.recurrence.listener != undefined) {
            worker.recurrence.listener();
            worker.recurrence.listener = undefined;
          }
        }

        if (worker.workerPublicData.listener != undefined) {
          worker.workerPublicData.listener();
          worker.workerPublicData.listener = undefined;
        }

        if (worker.multiEventsTimes.listener != undefined) {
          worker.multiEventsTimes.listener();
          worker.multiEventsTimes.listener = undefined;
        }

        logger.info("Workers Listenings have canceled");
      } catch (e) {
        console.error("Error while canceling the Workers listeners");
      }
    });
  }

  startTimesListening(worker: WorkerModel, isMulti: boolean) {
    // AppErrors.addError({ code: settingsCodeToInt[SettingsErrorCodes.startTimesListening] });
    // const updateTitle = translate("realTimeUpdateRecivedTitle", { needGender: false }) + '!';
    // const updateContet = translate("realTimeUpdateRecived", { needGender: false });

    // let workerPublicDocUpdates = 0;
    // let workerReccurenceDocUpdates = 0;
    // let workerMultiEventsTimesDocUpdates = 0;

    if (worker.workerPublicData.listener == null) {
      worker.workerPublicData.listener = this.generalRepo.docListenerRepo({
        path: `${buisnessCollection}/${this.business.businessId}/${workersCollection}/${worker.id}/${dataCollection}`,
        docId: dataDoc,
        onChanged: (workerBookingsListenerJson) => {
          // workerPublicDocUpdates++;

          // if (workerPublicDocUpdates > 2) {
          //   new TopOverlyNotification({
          //     title: updateTitle,
          //     content: updateContet,
          //   }).show();
          // }

          // this.firstTimeListenToWorkerPublic = false;
          this.updateWorkerPublicData(workerBookingsListenerJson, worker.id);
        },
      });
    }

    if (
      worker.recurrence.listener === undefined &&
      worker.hasRecurrenceEvents &&
      worker.isCustomersNeedRecurrence
    ) {
      worker.recurrence.listener = this.generalRepo.docListenerRepo({
        path: `${buisnessCollection}/${this.business.businessId}/${workersCollection}/${worker.id}/${dataCollection}`,
        docId: recurrenceEventsDoc,
        onChanged: (recurrenceEventsJson) => {
          // workerReccurenceDocUpdates++;

          // if (workerReccurenceDocUpdates > 2) {
          //   new TopOverlyNotification({
          //     title: updateTitle,
          //     content: updateContet,
          //   }).show();
          // }

          //this.firstTimeListenToRecurrenceEvents = false;
          this.updateReccurenceEvents(recurrenceEventsJson, worker.id);
        },
      });
    }

    if (worker.multiEventsTimes.listener === undefined && isMulti) {
      worker.multiEventsTimes.listener = this.generalRepo.docListenerRepo({
        path: `${buisnessCollection}/${this.business.businessId}/${workersCollection}/${worker.id}/${dataCollection}`,
        docId: multiEventsTimesDoc,

        onChanged: (multiEventsTimesJson) => {
          // workerMultiEventsTimesDocUpdates++;

          // if (workerMultiEventsTimesDocUpdates > 2) {
          //   new TopOverlyNotification({
          //     title: updateTitle,
          //     content: updateContet,
          //   }).show();
          // }

          //this.firstTimeListenToMultiEventsTimes = false;
          this.updateMultiEventsTimes(multiEventsTimesJson, worker.id);
        },
      });
    }
  }

  updateWorkerPublicData(
    bookingsDocListenerJson: DocumentSnapshot<DocumentData, DocumentData>,
    workerPhone: string
  ): void {
    if (this.workers[workerPhone] === undefined) {
      return;
    }

    if (
      !bookingsDocListenerJson.exists() ||
      bookingsDocListenerJson.data() === undefined
    ) {
      return;
    }

    this.workers[workerPhone]!.workerPublicData.setWorkerPublicData(
      bookingsDocListenerJson.data()!
    );

    BookingController.updateWorkerData(this.workers[workerPhone]!);

    logger.debug(
      `Get new workerData for the current worker updateWorkerPublicData--> ${workerPhone}`
    );
  }

  updateReccurenceEvents(
    recurrenceEventsJson: DocumentSnapshot<DocumentData, DocumentData>,
    workerId: string
  ): void {
    if (this.workers[workerId] === undefined) {
      return;
    }

    if (
      !recurrenceEventsJson.exists() ||
      recurrenceEventsJson.data() === undefined
    ) {
      return;
    }

    this.workers[workerId]!.recurrence.setRecurrenceEvents(
      recurrenceEventsJson.data() ?? {},
      workerId,
      this.business
    );

    BookingController.updateWorkerData(this.workers[workerId]!);

    logger.debug(
      `Get new workerData for the current worker updateReccurenceEvents --> ${workerId}`
    );
  }

  updateMultiEventsTimes(
    multiEventsTimesJson: DocumentSnapshot<DocumentData, DocumentData>,
    workerId: string
  ): void {
    if (this.workers[workerId] === undefined) {
      return;
    }

    if (
      !multiEventsTimesJson.exists() ||
      multiEventsTimesJson.data() === undefined
    ) {
      return;
    }

    this.workers[workerId]!.multiEventsTimes.setData(
      multiEventsTimesJson.data()!
    );

    BookingController.updateWorkerData(this.workers[workerId]!);

    logger.debug(
      `Get new workerData for the current worker updateReccurenceEvents --> ${workerId}`
    );
  }
}
