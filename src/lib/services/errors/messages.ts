enum Errors {
    sendSms,
    updateDisplayName,
    logout,
    serverError,
    storageError,
    listener,
    notLogedIn,
    illegalFields,
    passedLimit,
    notFoundItem,
    takenBooking,
    overlapWithOntherItem,
    takenMultiBooking,
    alreadyWorker,
    userNotFound,
    verification,
    network,
    emptyField,
    alreadyExistItem,
    uploadImages,
    notSelectedImages,
    wrongOptCode,
    expiredOpt,
    unknown,
    timeout,
    purchaseError,
    anonymouslySignIn,
    lowSubType,
    coincidingEvent,
    coincidingHoliday,
    realTimeServerError,
    blockedUser,
    noPermission,
    paymentProblem,
    currentlyOrderingForTime,
    notFoundBusiness,
    savePaymentDataError,
    redeemDepositError,
    saveDepositDataError,
    endOfWork,
    invoiceCreation,
    cantBookRecurrenceOnDates,
    cantBookRecurrenceOnEndlessDates,
    eventHasNoAccurances,
    workerDeleteTheBookingMeanwhile,
    workerUpdatedTheBookingMeanwhile,
    workerDeleteEventMeanwhile,
    workerUpdatedTheBookingWhilePayment,
    blockCard,
    stolenCard,
    callCreditCompany,
    transactionNotConfirmed,
    fakeCard,
    wrongCVV,
    worngCAVVUCAF,
    worngAvs,
    networkDisconnect,
    partlyConfirm,
    lackOfPointsStarsMilesOtherBenefit,
    unauthorizedCardAtTheTerminal,
    invalidBalanceCode,
    cardNotAssociatedWithTheNetwork,
    cardIsNotValid,
    currencyTypeIsNotAllowed,
    thereIsNoAuthorizationForACreditTypeInTheTransaction,
    invalidId,
    noTreatment,
    terminalNotAuthorizedToWorkWithThisMethodTheTerminalIsNotAuthorized,
    authenticationErrorTerminalReference,
    exceedingTheNumberOfPayments,
    communicationError,
    canceledTransaction,
    invalidToken,
    terminalNotAuthorizedToUseTheToken,
    deferredCharge,
    approvalWithoutCharge,
    receivingTransactionDetails,
    theCardDetailsWereNotReadInFull,
    theAmountOfTheItemsDoesNotMatch,
    YouMustEnterAFirstOrLastName,
    transactionDescriptionMustBeEntered,
    youCanCreditTheEntireTransactionOrASmallAmount,
    bigDiffrentBetweenLoginAndDelete,
    providerNotAllowed,
    userDisable,
    providerAlreadyLinked,
    credentialAlreadyInUse,
    accountAlreadyExists,
    invalidCredential,
    userMissmatch,
    noSuchProvider,
    duplicateBusinesssName,
    alreadyExistPhone,
    userExitManually,
    tooManyAttempts,
    expiredCode,
    cantUpdateEmailTooShortTimeBetween,
    cantUpdatePhonelTooShortTimeBetween,
    invalidPhoneNumber
  }
  
  const errorMessageToStr: { [key in Errors]: string } = {
    [Errors.serverError]: "errorWithServer",
    [Errors.updateDisplayName]: "cantSaveName",
    [Errors.sendSms]: "errorWhileSending",
    [Errors.logout]: "errorWhileLogout",
    [Errors.storageError]: "errorWithDataBase",
    [Errors.listener]: "errorListeners",
    [Errors.notLogedIn]: "noConnected",
    [Errors.illegalFields]: "illegalFields",
    [Errors.passedLimit]: "passLimit",
    [Errors.notFoundItem]: "noAvailable",
    [Errors.takenBooking]: "alreadyTaken",
    [Errors.alreadyWorker]: "alreadyWorker",
    [Errors.userNotFound]: "notFoundUser",
    [Errors.verification]: "verificationError",
    [Errors.network]: "networkError",
    [Errors.emptyField]: "noInfo",
    [Errors.notSelectedImages]: "noPickedImages",
    [Errors.alreadyExistItem]: "alreadyExist",
    [Errors.uploadImages]: "partOfImagesFaild",
    [Errors.unknown]: "uploadFailed",
    [Errors.timeout]: "timeout",
    [Errors.wrongOptCode]: "wrongOpt",
    [Errors.expiredOpt]: "expiredOpt",
    [Errors.purchaseError]: "purchaseError",
    [Errors.anonymouslySignIn]: "anonymouslySignIn",
    [Errors.lowSubType]: "lowSubType",
    [Errors.takenMultiBooking]: "takenMultiBooking",
    [Errors.coincidingEvent]: "UpdatedVacationsEventError",
    [Errors.realTimeServerError]: "realTimeServerError",
    [Errors.blockedUser]: "blockUser",
    [Errors.overlapWithOntherItem]:"overlapWithOntherItem",
    [Errors.noPermission]: "noPermission",
    [Errors.coincidingHoliday]: "coincidingHoliday",
    [Errors.paymentProblem]: "paymentProblem",
    [Errors.currentlyOrderingForTime]: "currentlyOrderingForTime",
    [Errors.notFoundBusiness]: "notFoundBusiness",
    [Errors.savePaymentDataError]: "savePaymentDataError",
    [Errors.redeemDepositError]: "redeemDepositError",
    [Errors.saveDepositDataError]: "saveDepositDataError",
    [Errors.endOfWork]: "endOfWork",
    [Errors.invoiceCreation]: "invoiceCreation",
    [Errors.cantBookRecurrenceOnDates]: "cantBookRecurrenceOnDates",
    [Errors.cantBookRecurrenceOnEndlessDates]: "cantBookRecurrenceOnEndlessDates",
    [Errors.eventHasNoAccurances]: "eventHasNoAccurances",
    [Errors.workerDeleteTheBookingMeanwhile]: "workerDeleteTheBookingMeanwhile",
    [Errors.workerUpdatedTheBookingMeanwhile]: "workerUpdatedTheBookingMeanwhile",
    [Errors.workerUpdatedTheBookingWhilePayment]: "workerUpdatedTheBookingWhilePayment",
    [Errors.workerDeleteEventMeanwhile]: "workerDeleteEventMeanwhile",
    [Errors.blockCard]: "blockCard",
    [Errors.stolenCard]: "stolenCard",
    [Errors.callCreditCompany]: "callCreditCompany",
    [Errors.transactionNotConfirmed]: "transactionNotConfirmed",
    [Errors.fakeCard]: "fakeCard",
    [Errors.wrongCVV]: "wrongCVV",
    [Errors.worngCAVVUCAF]: "worngCAVVUCAF",
    [Errors.worngAvs]: "worngAvs",
    [Errors.networkDisconnect]: "networkDisconnect",
    [Errors.partlyConfirm]: "partlyConfirm",
    [Errors.lackOfPointsStarsMilesOtherBenefit]: "lackOfPointsStarsMilesOtherBenefit",
    [Errors.unauthorizedCardAtTheTerminal]: "unauthorizedCardAtTheTerminal",
    [Errors.invalidBalanceCode]: "invalidBalanceCode",
    [Errors.cardNotAssociatedWithTheNetwork]: "cardNotAssociatedWithTheNetwork",
    [Errors.cardIsNotValid]: "cardIsNotValid",
    [Errors.currencyTypeIsNotAllowed]: "currencyTypeIsNotAllowed",
    [Errors.thereIsNoAuthorizationForACreditTypeInTheTransaction]: "thereIsNoAuthorizationForACreditTypeInTheTransaction",
    [Errors.invalidId]: "invalidId",
    [Errors.noTreatment]: "noTreatment",
    [Errors.terminalNotAuthorizedToWorkWithThisMethodTheTerminalIsNotAuthorized]: "terminalNotAuthorizedToWorkWithThisMethodTheTerminalIsNotAuthorized",
    [Errors.authenticationErrorTerminalReference]: "authenticationErrorTerminalReference",
    [Errors.exceedingTheNumberOfPayments]: "exceedingTheNumberOfPayments",
    [Errors.communicationError]: "communicationError",
    [Errors.canceledTransaction]: "canceledTransaction",
    [Errors.invalidToken]: "invalidToken",
    [Errors.terminalNotAuthorizedToUseTheToken]: "terminalNotAuthorizedToUseTheToken",
    [Errors.deferredCharge]: "deferredCharge",
    [Errors.approvalWithoutCharge]: "approvalWithoutCharge",
    [Errors.receivingTransactionDetails]: "receivingTransactionDetails",
    [Errors.theCardDetailsWereNotReadInFull]: "theCardDetailsWereNotReadInFull",
    [Errors.theAmountOfTheItemsDoesNotMatch]: "theAmountOfTheItemsDoesNotMatch",
    [Errors.YouMustEnterAFirstOrLastName]: "YouMustEnterAFirstOrLastName",
    [Errors.transactionDescriptionMustBeEntered]: "transactionDescriptionMustBeEntered",
    [Errors.youCanCreditTheEntireTransactionOrASmallAmount]: "youCanCreditTheEntireTransactionOrASmallAmoun",
    [Errors.bigDiffrentBetweenLoginAndDelete]: "bigDiffrentBetweenLoginAndDelete",
    [Errors.providerNotAllowed]: "providerNotAllowed",
    [Errors.userDisable]: "userDisable",
    [Errors.providerAlreadyLinked]: "providerAlreadyLinked",
    [Errors.credentialAlreadyInUse]: "credentialAlreadyInUse",
    [Errors.accountAlreadyExists]: "accountAlreadyExists",
    [Errors.invalidCredential]: "invalidCredential",
    [Errors.userMissmatch]: "userMissmatch",
    [Errors.noSuchProvider]: "noSuchProvider",
    [Errors.duplicateBusinesssName]: "duplicateBusinesssName",
    [Errors.alreadyExistPhone]: "alreadyExistPhone",
    [Errors.userExitManually]: "userExitManually",
    [Errors.tooManyAttempts]: "tooManyAttempts",
    [Errors.expiredCode]: "expiredCode",
    [Errors.cantUpdateEmailTooShortTimeBetween]: "cantUpdateEmailTooShortTimeBetween",
    [Errors.cantUpdatePhonelTooShortTimeBetween]: "cantUpdatePhonelTooShortTimeBetween",
    [Errors.invalidPhoneNumber]: "invalidPhoneNumber"
  };
  