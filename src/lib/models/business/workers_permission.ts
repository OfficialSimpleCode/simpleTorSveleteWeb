import {
  WorkersPermissionsKeys,
  WorkersPermissionsList,
  workersPermissionsKeysFromStr,
  workersPermissionsKeysToStr,
} from "$lib/consts/manager";

export default class WorkersPermissions {
  map: Record<string, Map<WorkersPermissionsKeys, boolean>> = {};

  constructor() {}

  static fromJson(json: Record<string, any>): WorkersPermissions {
    const permissions = new WorkersPermissions();
    permissions.map = {};

    Object.entries<Record<string, any>>(json).forEach(([workerId, data]) => {
      permissions.map[workerId] = new Map();
      WorkersPermissionsList.forEach((permission) => {
        permissions.map[workerId].set(
          permission,
          json[workerId][workersPermissionsKeysFromStr[permission]] ?? true
        );
      });
    });

    return permissions;
  }

  //   static fromWorkersPermissions(
  //     permissions: WorkersPermissions
  //   ): WorkersPermissions {
  //     const newPermissions = new WorkersPermissions();
  //     newPermissions.map = {};

  //     Object.entries(permissions.map).forEach(([workerId, data]) => {
  //       newPermissions.map[workerId] = new Map();
  //       data.forEach((value, key) => {
  //         newPermissions.map[workerId].set(key, value);
  //       });
  //     });

  //     return newPermissions;
  //   }

  toJson(): Record<string, Record<string, boolean>> {
    const data: Record<string, Record<string, boolean>> = {};
    Object.entries(this.map).forEach(([workerId, workerData]) => {
      workerData.forEach((value, key) => {
        if (!value) {
          data[workerId] ??= {};
          data[workerId][workersPermissionsKeysToStr[key]] = value;
        }
      });
    });

    return data;
  }
}
