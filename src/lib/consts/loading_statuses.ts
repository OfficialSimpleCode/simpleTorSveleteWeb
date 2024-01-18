export enum LoadingStatuses {
  success,
  unknownError,
  timeError,
  loading,
  maintenanceMode,
  updateAvailable,
  noInternetConnection,
}

export const loadingMessage: { [key in LoadingStatuses]: string } = {
  [LoadingStatuses.success]: "success",
  [LoadingStatuses.unknownError]: "unknownError",
  [LoadingStatuses.timeError]: "timeEror",
  [LoadingStatuses.loading]: "loading",
  [LoadingStatuses.maintenanceMode]: "maintenanceMode",
  [LoadingStatuses.updateAvailable]: "updateAvailable",
  [LoadingStatuses.noInternetConnection]: "noInternetConnection",
};
