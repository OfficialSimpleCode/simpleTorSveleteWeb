import {
  ArrayCommands,
  NumericCommands,
  buisnessCollection,
  dataCollection,
  dataDoc,
  phonesCollection,
  usersCollection,
} from "$lib/consts/db";
import { genderToStr, type Gender } from "$lib/consts/gender";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import UserModel from "$lib/models/user/user_model";
import { Errors } from "$lib/services/errors/messages";
import { phoneToDocId } from "$lib/utils/user";

import { AuthProvider } from "$lib/consts/auth";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import { Duration } from "$lib/models/core/duration";
import type PaymentCard from "$lib/models/payment_hyp/payment_card";
import { userStore } from "$lib/stores/User";
import { addDuration } from "$lib/utils/duration_utils";
import { hashText } from "$lib/utils/encryptions";
import { emailValidation } from "$lib/utils/validation_utils";
import pkg from "uuid";
import AppErrorsHelper from "../app_errors";
import DbPathesHelper from "../db_paths_helper";
import { GeneralData } from "../general_data";
import VerificationRepo from "../verification/verification_repo";
import UserRepo from "./user_repo";

const { v4 } = pkg;
export default class UserHelper {
  private static _singleton: UserHelper = new UserHelper();

  private constructor() {}

  public static GI(): UserHelper {
    return UserHelper._singleton;
  }

  public userRepo: UserRepo = new UserRepo();
  public verificationRepo: VerificationRepo = new VerificationRepo();

  async createUser({
    gender,
    phone,
    email,
    isVerifiedPhone,
    isVerifiedEmail,
    userName,
    authProvider,
    userId,
  }: {
    gender: Gender;
    phone: string;
    email: string;
    isVerifiedPhone: boolean;
    isVerifiedEmail: boolean;
    userName: string;
    authProvider: AuthProvider | undefined;
    userId: string;
  }): Promise<PhoneDataResult | undefined> {
    // Check if the phone that is being created already exists in the phone collection
    const phoneDoc = await this.userRepo.getDocSRV({
      path: phonesCollection,
      docId: phoneToDocId(phone),
    });

    if (phoneDoc === undefined || phoneDoc.exists()) {
      // Phone already exists; cannot create user
      AppErrorsHelper.GI().error = Errors.alreadyExistPhone;
      return undefined;
    }

    const currentUser: UserModel = new UserModel({
      id: userId,
      name: userName,
      email,
      isVerifiedPhone,
      isVerifiedEmail,
      phoneNumber: phone,
      myBuisnessesIds: [],
      productsIds: {},
      lastVisitedBuisnessesRemoved: [],
      lastVisitedBuisnesses: [],
      revenueCatId: v4(),
      gender,
    });
    console.log("currentUser", currentUser);
    currentUser.authProviders = authProvider
      ? new Map([[authProvider, new Date()]])
      : new Map();

    let phoneVerifiedResp: PhoneDataResult | undefined;

    if (authProvider === AuthProvider.Phone && isVerifiedPhone) {
      // Ensure the phone is verified
      phoneVerifiedResp = await this.mergePhoneCollectionWithUser(
        currentUser,
        phone,
        { fromCreateUser: true }
      );

      if (!phoneVerifiedResp) {
        currentUser.isVerifiedPhone = false;
      }
    }

    const createUserResp = await this.userRepo.createUser({
      user: currentUser,
    });

    if (!createUserResp) {
      return undefined;
    }

    return phoneVerifiedResp || new PhoneDataResult();
  }

  async mergePhoneCollectionWithUser(
    user: UserModel,
    phone: string,
    { fromCreateUser = false }: { fromCreateUser?: boolean }
  ): Promise<PhoneDataResult | undefined> {
    // get the invoices and bookings
    const phoneData = await this.userRepo.mergePhoneDataWithUser({
      phone,
      userId: user.id,
      name: user.name,
    });

    if (
      phoneData === undefined &&
      AppErrorsHelper.GI().error === Errors.alreadyExistPhone
    ) {
      return undefined;
    }

    return phoneData;
  }

  async updateCreditCardsPassword(
    currentPassword: string,
    newPassowrd: string
  ): Promise<boolean> {
    const newPaymentCards: { [key: string]: { [key: string]: PaymentCard } } =
      {};
    const newPaymentCardsJson: { [key: string]: any } = {};
    if (currentPassword !== "") {
      Object.entries<Record<string, PaymentCard>>(
        UserInitializer.GI().user.paymentCards
      ).forEach(([businessId, cards]) => {
        Object.entries(cards).forEach(([cardId, card]) => {
          const decryptedCard = card.decryptCard(currentPassword);
          const encryptedCard = decryptedCard.encryptCard(newPassowrd);
          newPaymentCards[businessId] ??= {};
          newPaymentCards[businessId][cardId] = encryptedCard;
          newPaymentCardsJson[businessId] ??= {};
          newPaymentCardsJson[businessId][cardId] = encryptedCard.toJson();
        });
      });
    }
    return await this.userRepo
      .updateMultipleFieldsInsideDocAsMapRepo({
        docId: UserInitializer.GI().user.id,
        path: usersCollection,
        data: {
          cardPaymentsPass: hashText(newPassowrd),
          paymentCards: newPaymentCardsJson,
        },
      })
      .then(async (value) => {
        if (value) {
          UserInitializer.GI().user.cardPaymentsPass = hashText(newPassowrd);
          UserInitializer.GI().user.paymentCards = newPaymentCards;
        }
        return value;
      });
  }

  async updateEmail(
    email: string,
    { isVerified = false }: { isVerified?: boolean } = {}
  ): Promise<boolean> {
    if (emailValidation(email) !== null) {
      AppErrorsHelper.GI().error = Errors.illegalFields;
      return false;
    }
    if (email === UserInitializer.GI().user.userPublicData.email) {
      return true;
    }
    if (
      addDuration(
        UserInitializer.GI().user.lastTimeUpdateEmail,
        new Duration({ days: 1 })
      ) > new Date()
    ) {
      AppErrorsHelper.GI().error = Errors.cantUpdateEmailTooShortTimeBetween;
      return false;
    }
    UserInitializer.GI().user.userPublicData.email = email;
    return await this.userRepo
      .updateMultipleFieldsInsideDocAsMapRepo({
        path: `${usersCollection}/${
          UserInitializer.GI().user.id
        }/${dataCollection}`,
        docId: dataDoc,
        data: {
          email: email,
          isVerifiedEmail: isVerified,
        },
      })
      .then(async (value) => {
        if (value) {
          UserInitializer.GI().user.userPublicData.isVerifiedEmail = isVerified;
          const now = new Date();
          return await this.userRepo
            .updateFieldInsideDocAsMapRepo({
              path: usersCollection,
              docId: UserInitializer.GI().user.id,
              fieldName: "lastTimeUpdateEmail",
              value: now.toString(),
            })
            .then((value) => {
              if (value) {
                UserInitializer.GI().user.lastTimeUpdateEmail = now;
              }
              return value;
            });
        }
        return value;
      });
  }

  async updateSeenUpdates(
    businessId: string,
    newSeenUpdates: Set<string>
  ): Promise<boolean> {
    //if there is a diffrent between we need to update the db
    const intersect = new Set(
      [...UserInitializer.GI().user.seenUpdates[businessId]].filter((i) =>
        newSeenUpdates.has(i)
      )
    );
    if (intersect.size === newSeenUpdates.size) {
      return true;
    }
    UserInitializer.GI().user.seenUpdates[businessId] = new Set<string>([
      ...newSeenUpdates,
    ]);
    return await this.userRepo.updateFieldInsideDocAsMapRepo({
      path: usersCollection,
      docId: UserInitializer.GI().user.id,
      fieldName: `seenUpdates.${businessId}`,
      value: Array.from(newSeenUpdates),
    });
  }

  async setGender(gender: Gender): Promise<boolean> {
    if (gender === UserInitializer.GI().user.gender) {
      console.log("22222222222222222222");
      return true;
    }
    console.log("eeeeeeeeeeeeeeeee");
    UserInitializer.GI().user.gender = gender;
    userStore.set(UserInitializer.GI().user);

    return await this.userRepo
      .updatePublicUserField({
        userId: UserInitializer.GI().user.id,
        fieldName: "gender",
        value: genderToStr[gender],
        businessesIds: Object.keys(
          UserInitializer.GI().user.userPublicData.permission
        ),
      })
      .then((value) => {
        console.log("33333333333", value);
        return value;
      });
  }

  async updateName(name: string): Promise<boolean> {
    if (name === UserInitializer.GI().user.name) {
      return true;
    }
    const user = UserInitializer.GI().user;

    user.name = name;
    return await this.userRepo
      .updatePublicUserField({
        userId: user.id,
        businessesIds: Object.keys(user.userPublicData.permission),
        fieldName: "name",
        value: name,
      })
      .then(async (value) => {
        if (value) {
          const futures: Promise<any>[] = [];
          user.userPublicData.myBuisnessesIds.forEach((businessId) => {
            futures.push(
              this.userRepo
                .updateFieldInsideDocAsMapRepo({
                  fieldName: "ownersName",
                  docId: businessId,
                  path: buisnessCollection,
                  value: name,
                })
                .then((value) => {
                  if (value) {
                    if (businessId == GeneralData.currentBusinesssId) {
                      BusinessInitializer.GI().business.ownersName = name;
                    }
                  }
                })
            );
          });
          if (user.isVerifiedPhone) {
            futures.push(
              this.userRepo.updateFieldInsideDocAsMapRepo({
                fieldName: "name",
                docId: phoneToDocId(user.phoneNumber),
                path: phonesCollection,
                value: name,
              })
            );
          }
          await Promise.all(futures);
        }
        return value;
      });
  }

  // async saveMyselfAsCustomerAtBusiness(workers: { [workerId: string]: WorkerModel }): Promise<boolean> {
  //   const futures: Promise<boolean>[] = [];
  //   const customer = UserInitializer.GI().user.userPublicData.customerData;
  //   customer.addedManually = false;

  //   for (const [workerId, worker] of Object.entries(workers)) {
  //     futures.push(
  //       workerHelper.loadLibrary().then(async () =>
  //         await workerHelper.WorkerHelper().addCustomers({
  //           [customer.customerUuid]: customer
  //         }, worker, GeneralData.currentBusinesssId)
  //       )
  //     );
  //   }

  //   const results = await Promise.all(futures);
  //   return !results.includes(false);
  // }

  async addOrRemoveLikeForStoryImage(
    imageId: string,
    workerId: string,
    userIdThatLiked: string,
    command: ArrayCommands
  ): Promise<boolean> {
    const value = await this.userRepo.updateFieldInsideDocAsArrayRepo({
      path: usersCollection,
      docId: userIdThatLiked,
      fieldName: "storyLikes",
      value: imageId,
      command,
    });

    if (value) {
      const currentLikes =
        BusinessInitializer.GI().workers[workerId]?.storylikesAmount[imageId] ??
        0;

      if (command === ArrayCommands.add) {
        await this.userRepo.incrementNumberChild({
          childPath: DbPathesHelper.GI().getLisksChildPath(workerId),
          valueId: imageId,
          delta: 1,
          command: NumericCommands.increment,
        });

        UserInitializer.GI().user.storyLikes.push(imageId);

        if (BusinessInitializer.GI().workers[workerId]) {
          BusinessInitializer.GI().workers[workerId]!.storylikesAmount[
            imageId
          ] = currentLikes + 1;
        }
      } else {
        if (currentLikes >= 0) {
          await this.userRepo.incrementNumberChild({
            childPath: DbPathesHelper.GI().getLisksChildPath(workerId),
            valueId: imageId,
            delta: 1,
            command: NumericCommands.decrement,
          });

          if (BusinessInitializer.GI().workers[workerId]) {
            BusinessInitializer.GI().workers[workerId]!.storylikesAmount[
              imageId
            ] = Math.max(
              BusinessInitializer.GI().workers[workerId]!.storylikesAmount[
                imageId
              ]! - 1,
              0
            );
          }
        }

        UserInitializer.GI().user.storyLikes =
          UserInitializer.GI().user.storyLikes.filter(
            (like) => like != imageId
          );
      }
    }

    return value;
  }
}
