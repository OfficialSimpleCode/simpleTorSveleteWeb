import {
  developersKey,
  favoriteBusinessesKey,
  limitsKey,
  maintenanceKey,
  purchasesKey,
  systemMessageKey,
  versionInfoKey,
} from "$lib/consts/remote_config";
import { firebaseConfig } from "$lib/firebase_config";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
  type RemoteConfig,
} from "firebase/remote-config";

export default class FirebseRometeConfig {
  private static _singleton: FirebseRometeConfig = new FirebseRometeConfig();
  private remoteConfig: RemoteConfig;

  private constructor() {
    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    this.remoteConfig = getRemoteConfig();
  }

  // public static GI(): FirebseRometeConfig {
  //   return FirebseRometeConfig._singleton;
  // }

  public async initService(): Promise<void> {
    this.remoteConfig.settings.fetchTimeoutMillis = 15000;
    this.remoteConfig.settings.minimumFetchIntervalMillis = 900000;

    await fetchAndActivate(this.remoteConfig);
  }

  public getVersionInfo(): Record<string, unknown> {
    try {
      const val: string = getValue(
        this.remoteConfig,
        versionInfoKey
      ).asString();
      return JSON.parse(val);
    } catch (e) {
      return {};
    }
  }

  public getDevelopers(): Record<string, any> {
    try {
      const val: string = getValue(this.remoteConfig, developersKey).asString();
      return JSON.parse(val);
    } catch (e) {
      return {};
    }
  }

  public getSystemMessage(): Record<string, unknown> {
    try {
      const val: string = getValue(
        this.remoteConfig,
        systemMessageKey
      ).asString();
      return JSON.parse(val);
    } catch (e) {
      return {};
    }
  }

  public getFavoriteBusinesses(): string[] {
    try {
      const val: string = getValue(
        this.remoteConfig,
        favoriteBusinessesKey
      ).asString();
      const businesses: string[] = [];
      const jsonVal: Record<string, unknown> = JSON.parse(val);
      Object.keys(jsonVal).forEach((key) => {
        businesses.push(key);
      });
      return businesses;
    } catch (e) {
      return [];
    }
  }

  public isAppInMaintenance(): boolean {
    try {
      return getValue(this.remoteConfig, maintenanceKey).asBoolean();
    } catch (e) {
      return false; // prevent users use the app while maintenance and error
    }
  }

  public getLimits(): Record<string, unknown> {
    try {
      const val: string = getValue(this.remoteConfig, limitsKey).asString();
      return JSON.parse(val);
    } catch (e) {
      return {}; // prevent users use the app while maintenance and error
    }
  }

  public getPurchasesInfo(): Record<string, unknown> {
    try {
      const val: string = getValue(this.remoteConfig, purchasesKey).asString();
      return JSON.parse(val);
    } catch (e) {
      return {}; // prevent users use the app while maintenance and error
    }
  }
}
