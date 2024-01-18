import {
  ErrorsTypeLog,
  developers,
  errorsTypeLogToStr,
} from "$lib/consts/application_general";
import {
  buisnessCollection,
  dataCollection,
  dataDoc,
  errorsCollection,
  helpersCollection,
  reportsCollection,
  usersCollection,
} from "$lib/consts/db";
import BusinessInitializer from "$lib/initializers/business_initializer";
import type ReportModel from "$lib/models/general/report";
import UserPublicData from "$lib/models/user/user_public_data";
import { dateToMonthStr } from "$lib/utils/times_utils/times_utils";
import { Timestamp } from "firebase/firestore";
// import { v4 as uuid } from "uuid";
import GeneralRepo from "./general/general_repo";
import { GeneralData } from "./general_data";

export default class DeveloperHelper {
  private static _singleton: DeveloperHelper = new DeveloperHelper();

  private constructor() {}

  public static GI(): DeveloperHelper {
    return DeveloperHelper._singleton;
  }

  private generalRepo: GeneralRepo = new GeneralRepo();

  // Return the updated FCMS of the developers
  public async getDevelopersFcms(): Promise<Set<string>> {
    let fcms: Set<string> = new Set<string>();
    const futures: Promise<void>[] = [];

    developers.forEach((developerPhone) => {
      futures.push(
        this.generalRepo
          .getDocRepo({
            path: `${usersCollection}/${developerPhone}/${dataCollection}`,
            docId: dataDoc,
          })
          .then((json) => {
            if (json !== undefined && json.exists() && json.data() != null) {
              const user: UserPublicData = UserPublicData.fromJson(
                json.data()!
              );
              fcms = new Set([...fcms, ...user.fcmsTokens]);
            }
          })
      );
    });

    await Promise.all(futures);

    return fcms;
  }

  public async changeSearchStatusOfBusiness(
    businessId: string,
    searchable: boolean
  ): Promise<boolean> {
    return await this.generalRepo
      .updateFieldInsideDocAsMapRepo({
        path: buisnessCollection,
        docId: businessId,
        fieldName: "show",
        value: searchable,
      })
      .then((value) => {
        if (value) {
          if (businessId === BusinessInitializer.GI().business.businessId) {
            BusinessInitializer.GI().business.searchable = searchable;
          }
          //UiManager.insertUpdate(Providers.settings);
        }
        return value;
      });
  }

  public async logErrorToDb({
    userId,
    errorType,
    exceptions,
    extras,
    strIssue,
  }: {
    userId: string;
    errorType: ErrorsTypeLog;
    exceptions: any[];
    extras: { [key: string]: any };
    strIssue?: string;
  }): Promise<void> {
    const error: { [key: string]: any } = {
      date: Timestamp.now().toDate().toUTCString(),
      error: exceptions.toString(),
      currentBusinessId: GeneralData.currentBusinesssId,
      ...extras,
    };

    if (strIssue) {
      error.strIssue = strIssue;
    }
    console.log("TO DO uuid");
    error.device = "web";
    const data: { [key: string]: any } = {
      [userId]: { ["ssssssssssssssss"]: error },
    };

    await this.generalRepo
      .setAsMapWithMergeRepo({
        path: `${helpersCollection}/${errorsCollection}/${errorsTypeLogToStr[errorType]}`,
        docId: dateToMonthStr(new Date()),
        insideEnviroments: false,
        valueAsJson: data,
      })
      .then((value) => {
        if (value) {
          //NotificationsHelper.notifyDevelopersAboutError({ userId, errorType });
        }
      });
  }

  public async loginProblemReport(
    report: ReportModel,
    errorType: ErrorsTypeLog
  ): Promise<boolean> {
    return await this.generalRepo
      .setAsMapWithMergeRepo({
        path: `${helpersCollection}/${reportsCollection}/${errorsTypeLogToStr[errorType]}`,
        docId: dateToMonthStr(new Date()),
        insideEnviroments: false,
        valueAsJson: { [report.id]: report.toJson() },
      })
      .then((value) => {
        if (value) {
          // NotificationsHelper.notifyDevelopersAboutReport({
          //   name: report.name,
          //   communication: report.communication,
          // });
        }
        return value;
      });
  }
}
