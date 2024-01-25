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
import { BusinessDesign } from "$lib/models/business/business_design";
import BusinessModel from "$lib/models/business/business_model";
import WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { businessStore } from "$lib/stores/Business";
import { workersStore } from "$lib/stores/Workers";
import { subTypeFromProductId } from "$lib/utils/subscription_utils";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";
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

  business: BusinessModel = new BusinessModel({
    businessId: "",
    design: new BusinessDesign(),
  }); // hold app settings (server settings)

  workers: Record<string, WorkerModel> = {};

  businessIcon: string = "";

  businessSubtype: SubType = SubType.trial;

  async initSettings(
    businessId: string,
    { fromLoading = false }: { fromLoading?: boolean } = {}
  ): Promise<boolean> {
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

      const resps = await Promise.all([
        this._loadSettingsDoc(businessId),
        this._loadBusinessWorkers(businessId),
      ]);

      //   // Update the subtype before continuing to the rest of the loading
      this.businessSubtype = subTypeFromProductId(
        this.business.productId,
        businessId
      );

      if (resps.length > 0 && resps[0] === false) {
        return false;
      }

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

  async loadBusiness(
    businessId: string,
    userId: string,
    {
      fromLoading = false,
      fromSearch = false,
    }: { fromLoading?: boolean; fromSearch?: boolean } = {}
  ): Promise<boolean> {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    // Clean business data
    // ScreenController.getInstance().initOffsets();
    // BusinessUIController.getInstance().changingPhotoIndex = 0;
    // SearchUIController.getInstance().searchController.text = "";
    // SearchUIController.getInstance().searchTapped.value = false;
    // BusinessInitializer.getInstance().emptyBusinessData();
    // UserInitializer.getInstance().currentBusiness = "";

    try {
      // Initialize settings
      const resp = await this.initSettings(businessId, {
        fromLoading,
      });

      //   if (!resp) {
      //     BusinessInitializer.GI().emptyBusinessData();
      //     SearchUIController.getInstance().initialTheSearchCache(businessId);
      //     UserInitializer.GI().deleteVisitedBusiness(businessId, {
      //       context,
      //       deletePermanently: true,
      //     });
      //     return false;
      //   }

      //   // Check for reminders in this current business
      //   UserInitializer.GI().user.userPublicData.reminders =
      //     await this.checkForReminders();

      //   // In case the business is not found
      //   if (!resp) {
      //     BusinessInitializer.GI().emptyBusinessData();
      //     AppErrors.getInstance().error = Errors.unknown;
      //     return fromLoading;
      //   }

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

      workersStore.set(BusinessInitializer.GI().workers);
      businessStore.set(BusinessInitializer.GI().business);
      //   UiManager.insertUpdate(Providers.settings);
      return true;
    } catch (e) {
      //   //   logger.e(`Error loading settings --> ${e}`);
      //   // Empty business data - no need to await for device cache deletion
      //   BusinessInitializer.GI().emptyBusinessData();
      //   AppErrorsHelper.GI().details = e.message;
      return false;
    }
  }

  async _loadSettingsDoc(businessId: string): Promise<boolean> {
    try {
      console.log("eeeeeeedddddddddddddd");
      const doc = await this.generalRepo.getDocRepo({
        path: buisnessCollection,
        docId: businessId,
      });

      if (doc === undefined || !doc.exists || doc.data() === null) {
        AppErrorsHelper.GI().error = Errors.notFoundBusiness;
        return false;
      }

      this.business = BusinessModel.fromJson(doc.data()!, businessId);

      //   // Cache the changing images
      //   changingImages = cacheImages(
      //     business.design.changingImages,
      //     context,
      //     gWidthOriginal * 2,
      //     changingImagesHeight * 2,
      //     ScreenController.getInstance().longTimeCacheManager
      //   );

      //   // Cache the products images
      //   productsCacheImages = cacheImages(
      //     Array.from(business.design.products.values()).map(
      //       (product) => product.imageUrl
      //     ),
      //     context,
      //     gWidth,
      //     gWidth * (productImageRatioY / productImageRatioX),
      //     ScreenController.getInstance().shortTimeCacheManager
      //   );

      return true;
    } catch (e) {
      //logger.e(`Error while loading the settings doc --> ${e}`);
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
  async makeBusinessDataListener() {
    const businessDataPath = DbPathesHelper.GI().getBusinessDataPath(
      GeneralData.currentBusinesssId
    );
    this.business.businessData.listener = this.generalRepo.listenToChild({
      childPath: businessDataPath,
      callback: (snapshot) => {
        if (snapshot.exists()) {
          this.business.businessData.setBusinessData(snapshot);
          console.log(this.business.businessData);
        }
      },
    });
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
      if (!worker.workerDocListner) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
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
    workersStore.set(this.workers);

    console.log(
      `Get new worker for the current worker updateWorkerObj--> ${workerId}`
    );
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

  startTimesListening(
    worker: WorkerModel,
    isMulti: boolean,
    workerAction: boolean
  ) {
    console.log("startTimesListening");
    // AppErrors.addError({ code: settingsCodeToInt[SettingsErrorCodes.startTimesListening] });
    // const updateTitle = translate("realTimeUpdateRecivedTitle", { needGender: false }) + '!';
    // const updateContet = translate("realTimeUpdateRecived", { needGender: false });

    // let workerPublicDocUpdates = 0;
    // let workerReccurenceDocUpdates = 0;
    // let workerMultiEventsTimesDocUpdates = 0;

    if (worker.workerPublicData.listener === undefined) {
      worker.workerPublicData.listener = this.generalRepo.docListenerRepo({
        path: `${buisnessCollection}/${this.business.businessId}/${workersCollection}/${worker.id}/${dataCollection}`,
        docId: dataDoc,
        onChanged: (workerBookingsListenerJson) => {
          console.log("workerPublicData");
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
          console.log("recurrence");
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
