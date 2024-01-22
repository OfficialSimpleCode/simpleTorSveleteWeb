import { logger } from "$lib/consts/application_general";
import { buisnessCollection, workersCollection } from "$lib/consts/db";
import { SubType } from "$lib/consts/purchases";
import AppErrorsHelper from "$lib/helpers/app_errors";
import DbPathesHelper from "$lib/helpers/db_paths_helper";
import GeneralRepo from "$lib/helpers/general/general_repo";
import { GeneralData } from "$lib/helpers/general_data";
import ThemeHelper from "$lib/helpers/theme_helper";
import { BusinessDesign } from "$lib/models/business/business_design";
import BusinessModel from "$lib/models/business/business_model";
import WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { subTypeFromProductId } from "$lib/utils/subscription_utils";
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
      console.log("222222222222223333333333333");
      const resps = await Promise.all([
        this._loadSettingsDoc(businessId),
        this._loadBusinessWorkers(businessId),
      ]);

      console.log("22222222222222222");

      //   // Update the subtype before continuing to the rest of the loading
      this.businessSubtype = subTypeFromProductId(
        this.business.productId,
        businessId
      );

      if (resps.length > 0 && resps[0] === false) {
        return false;
      }

      // Make the business data listener from the real-time database
      //this.makeBusinessDataListener();

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
    console.log("1111111111111111111");
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
      console.log("33333333333333333322222222222222222");

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
      console.log("eewwwwwwwww");
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
          this.business.businessData.setBusinessData(snapshot.val());
        }
      },
    });
  }
}
