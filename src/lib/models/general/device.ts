import { dateToDateStr } from "$lib/utils/times_utils";

export default class Device {
  token: string;
  joinDate: Date;
  id: string;
  activeNotifications: boolean;

  constructor({
    token = "",
    joinDate,
    id = "",
    activeNotifications = true,
  }: {
    token?: string;
    joinDate: Date;
    id?: string;
    activeNotifications?: boolean;
  }) {
    this.token = token;
    this.joinDate = joinDate;
    this.id = id;
    this.activeNotifications = activeNotifications;
  }

  static fromJson(json: Record<string, any>, deviceId: string): Device {
    const device = new Device({
      joinDate: new Date(0),
    });

    device.id = deviceId;
    device.activeNotifications = json["activeNotifications"] ?? true;
    device.token = json["token"] ?? "";

    return device;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    // Check if activeNotifications is false and add it to data
    if (!this.activeNotifications) {
      data["activeNotifications"] = this.activeNotifications;
    }

    // Add token and formatted joinDate to data
    data["token"] = this.token;
    data["joinDate"] = dateToDateStr(this.joinDate);

    return data;
  }

  // deviceConvertor = {
  //   toJson: (device: Device) => {
  //     return {
  //       name: city.name,
  //       state: city.state,
  //       country: city.country,
  //     };
  //   },
  //   fromJson: (json) => {
  //     const data = snapshot.data(options);
  //     return new City(data.name, data.state, data.country);
  //   },
  // };

  static fromDevice(device: Device): Device {
    return new Device({
      joinDate: device.joinDate,
      id: device.id,
      activeNotifications: device.activeNotifications,
      token: device.token,
    });
  }
}
