export enum WorkersPermissionsKeys {
  scheduleSettings,
  workSettings,
  customers,
  dataPermission,
  waitings,
  storyUpload,
  resumePermission,
  schedulePemission,
  bookingsPermission,
  invoicesPremission,
  paymentRequestPermmission,
}
export const workersPermissionsKeysToStr: Record<
  WorkersPermissionsKeys,
  string
> = {
  [WorkersPermissionsKeys.scheduleSettings]: "scheduleSettings",
  [WorkersPermissionsKeys.workSettings]: "workSettings",
  [WorkersPermissionsKeys.customers]: "customers",
  [WorkersPermissionsKeys.resumePermission]: "resumePermission",
  [WorkersPermissionsKeys.dataPermission]: "dataPermission",
  [WorkersPermissionsKeys.invoicesPremission]: "invoicesPremission",
  [WorkersPermissionsKeys.waitings]: "waitings",
  [WorkersPermissionsKeys.storyUpload]: "storyUpload",
  [WorkersPermissionsKeys.schedulePemission]: "schedulePemission",
  [WorkersPermissionsKeys.bookingsPermission]: "bookingsPermission",
  [WorkersPermissionsKeys.paymentRequestPermmission]:
    "paymentRequestPermmission",
};

export const workersPermissionsKeysFromStr: Record<
  string,
  WorkersPermissionsKeys
> = {
  scheduleSettings: WorkersPermissionsKeys.scheduleSettings,
  workSettings: WorkersPermissionsKeys.workSettings,
  customers: WorkersPermissionsKeys.customers,
  resumePermission: WorkersPermissionsKeys.customers,
  dataPermission: WorkersPermissionsKeys.dataPermission,
  invoicesPremission: WorkersPermissionsKeys.invoicesPremission,
  waitings: WorkersPermissionsKeys.waitings,
  storyUpload: WorkersPermissionsKeys.storyUpload,
  schedulePermission: WorkersPermissionsKeys.schedulePemission,
  bookingsPermission: WorkersPermissionsKeys.bookingsPermission,
  paymentRequestPermission: WorkersPermissionsKeys.paymentRequestPermmission,
};

export const WorkersPermissionsList: WorkersPermissionsKeys[] = [
  WorkersPermissionsKeys.scheduleSettings,
  WorkersPermissionsKeys.workSettings,
  WorkersPermissionsKeys.customers,
  WorkersPermissionsKeys.dataPermission,
  WorkersPermissionsKeys.waitings,
  WorkersPermissionsKeys.storyUpload,
  WorkersPermissionsKeys.resumePermission,
  WorkersPermissionsKeys.schedulePemission,
  WorkersPermissionsKeys.bookingsPermission,
  WorkersPermissionsKeys.invoicesPremission,
  WorkersPermissionsKeys.paymentRequestPermmission,
];
