import {
  ArrayCommands,
  NumericCommands,
  bookingsObjectsCollection,
  buisnessCollection,
  customersDataDoc,
  dataCollection,
  dataDoc,
  phonesCollection,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import { genderToStr, type Gender } from "$lib/consts/gender";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import UserModel from "$lib/models/user/user_model";
import { Errors } from "$lib/services/errors/messages";
import { phoneToDocId } from "$lib/utils/user";

import { AuthProvider, authProviderToStr } from "$lib/consts/auth";
import { maxTimeBetweenLogInAndDelete } from "$lib/consts/limitation";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import type PaymentCard from "$lib/models/payment_hyp/payment_card";
import { isConnectedStore, userStore } from "$lib/stores/User";
import { addDuration, subDuration } from "$lib/utils/duration_utils";
import { hashText } from "$lib/utils/encryptions";
import {
  dateIsoStr,
  dateToDateStr,
  dateToTimeStr,
  isoToDate,
} from "$lib/utils/times_utils";
import { emailValidation } from "$lib/utils/validation_utils";
import pkg from "uuid";
import AppErrorsHelper from "../app_errors";
import { BookingRepo } from "../booking/booking_repo";
import DbPathesHelper from "../db_paths_helper";
import { GeneralData } from "../general_data";
import ManagerHelper from "../manager/manager_helper";
import { VerificationHelper } from "../verification/verification_helper";
import { VerificationRepo } from "../verification/verification_repo";
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
      lastVisitedBuisnessesRemoved: [],
      lastVisitedBuisnesses: [],
      revenueCatId: v4(),
      gender,
    });
    console.log("currentUser", currentUser);
    currentUser.authProviders =
      authProvider != null ? new Map([[authProvider, new Date()]]) : new Map();

    let phoneVerifiedResp: PhoneDataResult | undefined;

    if (authProvider === AuthProvider.Phone && isVerifiedPhone) {
      // Ensure the phone is verified
      phoneVerifiedResp = await this.mergePhoneCollectionWithUser(
        currentUser,
        phone
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

    return phoneVerifiedResp || new PhoneDataResult({ phone: phone });
  }

  async deleteUser(user: UserModel): Promise<boolean> {
    // Make sure the delete is happened after login
    if (
      VerificationHelper.GI().lastLoginDate == null ||
      subDuration(
        isoToDate(VerificationHelper.GI().lastLoginDate!),
        maxTimeBetweenLogInAndDelete
      ) > new Date()
    ) {
      AppErrorsHelper.GI().error = Errors.bigDiffrentBetweenLoginAndDelete;
      return false;
    }

    await this._beforeLogout();

    // Delete all the worker objects of me from all the businesses
    const permissions = [
      ...Object.keys(UserInitializer.GI().user.userPublicData.permission),
    ];
    console.log("qqqqqqqqqqqqqqqqq");
    await Promise.all(
      permissions.map(async (id) => {
        if (UserInitializer.GI().user.userPublicData.permission.get(id) === 1) {
          return await ManagerHelper.GI().deleteWorker({
            workerId: user.id,
            buisnessId: id,
          });
        }
      })
    );

    // Delete all my businesses
    const duplicate = [
      ...UserInitializer.GI().user.userPublicData.myBuisnessesIds,
    ];

    await Promise.all(
      duplicate.map(async (businessId) => {
        return await ManagerHelper.GI().deleteBuisness(
          businessId,
          true,
          "",
          ""
        );
      })
    );

    await UserInitializer.GI().getAllBookingsDocs();

    await this.markUserDeletedOnAllWorkerBookings();

    ///TODO notifiication
    // await NotificationHandler.GI().cancelAllBookingsScheduleNoification(
    //   UserInitializer().user.bookings.all
    // );

    await this.userRepo.deleteUser({ user });

    return await this.verificationRepo.deleteUser().then(async (value) => {
      if (value) {
        console.log(value);
        UserInitializer.GI().user = new UserModel({
          name: "guest",
        });
        userStore.set(UserInitializer.GI().user);
        isConnectedStore.set(false);
      }
      return value;
    });
  }

  async logout(): Promise<boolean> {
    await this._beforeLogout();

    return await this.verificationRepo.logout().then(async (value) => {
      if (value) {
        UserInitializer.GI().user = new UserModel({
          name: "guest",
        });
        userStore.set(UserInitializer.GI().user);
        isConnectedStore.set(false);
      }
      return value;
    });
  }

  async _beforeLogout(): Promise<void> {
    UserInitializer.GI().cancelPublicDataListening(UserInitializer.GI().user);
  }

  async markUserDeletedOnAllWorkerBookings(): Promise<void> {
    const futures: Promise<boolean>[] = [];
    Object.entries(UserInitializer.GI().user.bookings.all).forEach(
      ([bookingId, booking]) => {
        if (booking.workerDeleted) {
          return;
        }
        futures.push(
          this.userRepo.updateFieldInsideDocAsMapRepo({
            path: `${buisnessCollection}/${booking.buisnessId}/${workersCollection}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
            docId: dateToDateStr(booking.bookingDate),
            fieldName: booking.isMultiRef
              ? `${dateToTimeStr(
                  booking.bookingDate
                )}.users.${bookingId}.userDeleted`
              : `${bookingId}.userDeleted`,
            value: true,
          })
        );
      }
    );
    await Promise.all(futures);
  }

  async mergePhoneCollectionWithUser(
    user: UserModel,
    phone: string
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
    if (emailValidation(email) != null) {
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
        console.log(UserInitializer.GI().user.userPublicData.email);
        userStore.set(UserInitializer.GI().user);
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
      return true;
    }

    UserInitializer.GI().user.gender = gender;
    userStore.set(UserInitializer.GI().user);

    return await this.userRepo.updatePublicUserField({
      userId: UserInitializer.GI().user.id,
      fieldName: "gender",
      value: genderToStr[gender],
      businessesIds: Object.keys(
        UserInitializer.GI().user.userPublicData.permission
      ),
    });
  }

  async updateName(name: string): Promise<boolean> {
    if (name === UserInitializer.GI().user.name) {
      return true;
    }
    const user = UserInitializer.GI().user;

    user.name = name;
    userStore.set(user);
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
        console.log(value);
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

  async addAuthProvider({
    provider,
    isVerifiedPhone,
    phone,
    isVerfiedEmail,
    email,
  }: {
    provider: AuthProvider;
    isVerifiedPhone?: boolean;
    phone?: string;
    isVerfiedEmail?: boolean;
    email?: string;
  }): Promise<PhoneDataResult | undefined> {
    if (UserInitializer.GI().user.authProviders.has(provider)) {
      return new PhoneDataResult({ phone: phone ?? "" });
    }

    const addedTime = new Date();
    UserInitializer.GI().user.authProviders.set(provider, addedTime);

    const data: Record<string, string> = {};
    UserInitializer.GI().user.authProviders.forEach((date, proivder) => {
      if (authProviderToStr[proivder] !== null) {
        data[authProviderToStr[proivder]!] = dateIsoStr(date);
      }
    });

    const value = await this.userRepo.updateFieldInsideDocAsMapRepo({
      docId: UserInitializer.GI().user.id,
      path: usersCollection,
      fieldName: "authProviders",
      value: data,
    });

    if (!value) {
      // not successful, delete the added provider
      UserInitializer.GI().user.authProviders.delete(provider);
    } else {
      let dataResult: PhoneDataResult | undefined = new PhoneDataResult({
        phone: phone ?? "",
      });
      if (phone != null && isVerifiedPhone === true) {
        dataResult = await this.updatePhone(phone, isVerifiedPhone === true);
      }
      if (email != null) {
        await this.updateEmail(email, { isVerified: isVerfiedEmail === true });
      }
      userStore.set(UserInitializer.GI().user);
      return dataResult;
    }

    return new PhoneDataResult({ phone: phone ?? "" });
  }

  async updatePhone(
    phone: string,
    isVerified: boolean
  ): Promise<PhoneDataResult | undefined> {
    // same phone, no need to update
    if (
      UserInitializer.GI().user.phoneNumber === phone &&
      isVerified === UserInitializer.GI().user.isVerifiedPhone
    ) {
      return new PhoneDataResult({ phone: phone });
    }

    if (
      UserInitializer.GI().user.phoneNumber !== phone &&
      addDuration(
        UserInitializer.GI().user.lastTimeUpdatePhone,
        new Duration({ days: 1 })
      ) > new Date()
    ) {
      AppErrorsHelper.GI().error = Errors.cantUpdatePhonelTooShortTimeBetween;
      return undefined;
    }

    let phoneVerifiedResp: PhoneDataResult | undefined;
    if (isVerified) {
      // make sure the phone is verified
      phoneVerifiedResp = await this.mergePhoneCollectionWithUser(
        UserInitializer.GI().user,
        phone
      );
      if (phoneVerifiedResp == null) {
        isVerified = false;
        // make sure again that the current details are different
        if (
          UserInitializer.GI().user.phoneNumber === phone &&
          isVerified === UserInitializer.GI().user.isVerifiedPhone
        ) {
          return new PhoneDataResult({ phone: phone });
        }
      }
    }

    if (
      (UserInitializer.GI().user.isVerifiedPhone && !isVerified) ||
      (UserInitializer.GI().user.isVerifiedPhone &&
        UserInitializer.GI().user.phoneNumber !== phone)
    ) {
      // delete the old phone doc from the phones collection
      const resp = await this.userRepo.deleteDocRepo({
        path: phonesCollection,
        docId: phoneToDocId(UserInitializer.GI().user.phoneNumber),
      });

      if (!resp) {
        return undefined;
      }
    }

    const value = await this.userRepo.updatePhone({
      currentPhone: UserInitializer.GI().user.phoneNumber,
      userId: UserInitializer.GI().user.id,
      businessesIds: Object.keys(
        UserInitializer.GI().user.userPublicData.permission
      ),
      phone,
      isVerified,
    });

    if (value) {
      const now = new Date();
      await this.updateAllClients(
        UserInitializer.GI().user.id,
        phone,
        isVerified
      );

      if (UserInitializer.GI().user.phoneNumber !== phone) {
        await this.userRepo
          .updateFieldInsideDocAsMapRepo({
            path: usersCollection,
            docId: UserInitializer.GI().user.id,
            fieldName: "lastTimeUpdatePhone",
            value: now.toISOString(),
          })
          .then((result) => {
            if (result) {
              UserInitializer.GI().user.lastTimeUpdatePhone = now;
            }
          });

        await this.handleScheduleMessgesPhoneChange(phone);
        await this.handleExistBookingsPhoneChange(phone);
      } else {
        await this.makeReminderToAllBookingsWithoutRemminder(isVerified);
      }

      // update locally
      UserInitializer.GI().user.phoneNumber = phone;
      UserInitializer.GI().user.userPublicData.phoneNumber = phone;
      UserInitializer.GI().user.isVerifiedPhone = isVerified;
      UserInitializer.GI().user.userPublicData.isVerifiedPhone = isVerified;
      userStore.set(UserInitializer.GI().user);

      return phoneVerifiedResp ?? new PhoneDataResult({ phone: phone });
    }

    return undefined;
  }

  async handleScheduleMessgesPhoneChange(newPhone: string): Promise<void> {
    ///TODO notification
    return;
  }

  async makeReminderToAllBookingsWithoutRemminder(isVerified: boolean) {
    //TODO
  }

  async handleExistBookingsPhoneChange(newPhone: string): Promise<void> {
    const bookingsToUpdate: Record<string, Booking> = {};

    await UserInitializer.GI().getAllBookingsDocs();
    const bookingRepo = new BookingRepo();
    //const multiBookingRepo = new MultiBookingRepo();

    const bookingsToPassOn = UserInitializer.GI().user.bookings.all;

    Object.entries(bookingsToPassOn).forEach(([bookingId, booking]) => {
      booking.customerPhone = newPhone;
      if (booking.workerDeleted) {
        return;
      }
      bookingsToUpdate[bookingId] = booking;
    });

    const futures: Promise<boolean>[] = [];
    //TODO multi booking
    Object.entries(bookingsToUpdate).forEach(([bookingId, booking]) => {
      if (booking.isMultiRef) {
        // const multiBooking = booking.toMultiBooking();
        // futures.push(
        //   multiBookingRepo.updateFieldsInMultiBookingUser({
        //     multiBooking,
        //     multiBookingUser:
        //       multiBooking.users[Object.keys(multiBooking.users)[0]],
        //     data: { customerPhone: newPhone },
        //     workerAction: false,
        //   })
        // );
      } else {
        futures.push(
          bookingRepo.updateFieldsInBooking({
            booking: booking,
            data: { customerPhone: newPhone },
          })
        );
      }
    });

    await Promise.all(futures);
  }

  async updateAllClients(
    userId: string,
    userPhone: string,
    isVerifiedPhone: boolean
  ): Promise<boolean> {
    const clientAt = UserInitializer.GI().user.userPublicData.clientAt;
    const futures: Promise<boolean>[] = [];

    clientAt.forEach((workerIds, businessId) => {
      const path = `${buisnessCollection}/${businessId}/${workersCollection}`;

      workerIds.forEach((workerId) => {
        futures.push(
          this.userRepo.updateMultipleFieldsInsideDocAsMapRepo({
            path: `${path}/${workerId}/${dataCollection}`,
            docId: customersDataDoc,
            data: {
              [`data.${userId}.isVerifiedPhone`]: isVerifiedPhone,
              [`data.${userId}.phoneNumber`]: userPhone,
            },
          })
        );
      });
    });

    const resp = await Promise.all(futures);
    return !resp.includes(false);
  }
}
