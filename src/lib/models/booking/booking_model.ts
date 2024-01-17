// Assuming ScheduleItem, BookingReminderType, NotificationType, Gender, IconData,
// OrderingOptions, BookingStatuses, BookingInvoiceData, BookingTransactionModel,
// Debt, Treatment, RecurrenceEvent, RecurrenceEventRefInfo, MultiBooking,
// BookingPaymentRequestData, BookingReminderType, NotificationOption, and other related types are defined somewhere

import IconData from "../general/icon_data";
import ScheduleItem from "../schedule/schedule_item";

export default class Booking extends ScheduleItem {
    customerName: string = '';
    customerPhone: string = '';
    customerId: string = '';
  
    orderingOptions: OrderingOptions = OrderingOptions.app;
    isVerifiedPhone: boolean = false;
    isUserExist: boolean = true;
    notificationType: NotificationType = NotificationType.none;
    workerNotificationOption: NotificationOption = NotificationOption.PushOrSMS;
    workerRemindersTypes: Map<BookingReminderType, number> = new Map();
    workerDeleted: boolean = false;
    clientMail: string = "";
    showAdressAlert: boolean = false;
    showPhoneAlert: boolean = false;
    signOnDeviceCalendar: boolean = false;
    isMultiRef: boolean = false;
    cancelDate?: Date;
    lastTimeNotifyOnDebt?: Date;
    adress: string = "";
    wasWaiting: boolean = false;
    bookingDate: Date = new Date(0);
    note: string = "";
    needCancel: boolean = false;
    treatments: Map<string, Treatment> = new Map();
  
    userGender: Gender = Gender.anonymous;
    workerGender: Gender = Gender.anonymous;
    status: BookingStatuses = BookingStatuses.approved;
    confirmedArrival: boolean = false;
    bookingId: string = '';
    userFcms: Set<string> = new Set();
    clientNote: string = "";
  
    shopIcon: IconData = new IconData();
  
    remindersTypes: Map<BookingReminderType, number> = new Map();
    createdAt: Date = new Date();
  
    finishInvoices: boolean = false;
    invoices: Map<string, BookingInvoiceData> = new Map();
  
    transactions: Map<string, BookingTransactionModel> = new Map();
    
    recurrenceTimeId?: string;
    recurreneFatherDate?: string;
  
    debts: Map<string, Debt> = new Map();
  
    addToClientAt: boolean = false;
    paymentRequest?: BookingPaymentRequestData;
  
    userDeleted: boolean = false;
  
    fatherMultiBooking?: MultiBooking;
    fatherRecurrenceBooking?: Booking;
  
    constructor(options: {
      customerName?: string;
      customerPhone?: string;
      customerId?: string;
      workerPhone?: string;
      workerGender?: Gender;
      userGender?: Gender;
      businessName?: string;
      buisnessId?: string;
      bookingId?: string;
      debts?: Map<string, Debt>;
      userFcms?: Set<string>;
    }) {
      super(options.workerPhone || '', '', '', options.businessName || '', options.buisnessId || '');
      this.customerName = options.customerName || '';
      this.customerPhone = options.customerPhone || '';
      this.customerId = options.customerId || '';
      this.bookingId = options.bookingId || '';
      this.debts = options.debts || new Map();
      this.userFcms = options.userFcms || new Set();
    }
  
    static empty(): Booking {
      return new Booking({});
    }
  
    static fromBooking(booking: Booking): Booking {
      const newBooking = new Booking({
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        customerId: booking.customerId,
        workerPhone: booking.workerPhone,
        workerGender: booking.workerGender,
        userGender: booking.userGender,
        businessName: booking.businessName,
        buisnessId: booking.buisnessId,
        bookingId: booking.bookingId,
        debts: new Map(),
        userFcms: new Set(),
      });
  
      newBooking.workerGender = booking.workerGender;
      newBooking.shopIcon = booking.shopIcon;
  
      newBooking.recurrenceTimeId = booking.recurrenceTimeId;
      newBooking.note = booking.note;
      newBooking.workerRemindersTypes = { ...booking.workerRemindersTypes };
      newBooking.signOnDeviceCalendar = booking.signOnDeviceCalendar;
      newBooking.userDeleted = booking.userDeleted;
      newBooking.workerNotificationOption = booking.workerNotificationOption;
      newBooking.paymentRequest = booking.paymentRequest;
      newBooking.remindersTypes = { ...booking.remindersTypes };
      newBooking.isVerifiedPhone = booking.isVerifiedPhone;
      newBooking.workerDeleted = booking.workerDeleted;
      newBooking.finishInvoices = booking.finishInvoices;
      newBooking.adress = booking.adress;
      newBooking.addToClientAt = booking.addToClientAt;
      newBooking.showAdressAlert = booking.showAdressAlert;
      newBooking.showPhoneAlert = booking.showPhoneAlert;
      newBooking.orderingOptions = booking.orderingOptions;
      newBooking.isUserExist = booking.isUserExist;
      newBooking.isMultiRef = booking.isMultiRef;
      newBooking.needCancel = booking.needCancel;
      newBooking.userGender = booking.userGender;
      newBooking.bookingDate = booking.bookingDate;
      if (booking.recurrenceEventRefInfo !== undefined) {
        newBooking.recurrenceEventRefInfo = RecurrenceEvent.fromRecurrenceEvent(booking.recurrenceEventRefInfo!);
      }
      if (booking.recurrenceEvent !== undefined) {
        newBooking.recurrenceEvent = RecurrenceEvent.fromRecurrenceEvent(booking.recurrenceEvent!);
      }
      newBooking.recurrenceNotificationsLastDate = booking.recurrenceNotificationsLastDate;
      newBooking.cancelDate = booking.cancelDate;
      newBooking.customerId = booking.customerId;
      newBooking.workerPhone = booking.workerPhone;
      newBooking.lastTimeNotifyOnDebt = booking.lastTimeNotifyOnDebt;
  
      booking.debts.forEach((id, debt) => {
        newBooking.debts.set(id, Debt.fromDebt(debt));
      });
  
      newBooking.treatments = new Map();
      for (const [index, treatmentJson] of Object.entries(booking.treatments)) {
        const treatment = Treatment.fromTreatment(treatmentJson);
        treatment.index = index;
        newBooking.treatments[index] = treatment;
      }
  
      newBooking.invoices = {};
      for (const [id, invoice] of Object.entries(booking.invoices)) {
        newBooking.invoices[id] = BookingInvoiceData.fromBookingInvoiceData(invoice);
      }
  
      newBooking.clientNote = booking.clientNote;
      newBooking.status = booking.status;
      newBooking.confirmedArrival = booking.confirmedArrival;
      newBooking.createdAt = booking.createdAt;
      newBooking.clientMail = booking.clientMail;
      newBooking.workerName = booking.workerName;
      newBooking.buisnessId = booking.buisnessId;
  
      newBooking.notificationType = booking.notificationType;
      newBooking.userFcms = new Set(booking.userFcms);
      newBooking.transactions = {};
  
      newBooking.recurreneFatherDate = booking.recurreneFatherDate;
      newBooking.recurrenceRef = booking.recurrenceRef;
  
      for (const [id, transaction] of Object.entries(booking.transactions)) {
        newBooking.transactions[id] = BookingTransactionModel.fromTransaction(transaction);
      }
  
      return newBooking;
    }
  
    
       
      }  