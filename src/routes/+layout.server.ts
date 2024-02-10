import { firebaseConfig } from "$lib/consts/firebase_config";
import { getApp, getApps, initializeApp } from "firebase/app";

export const load = async () => {
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
};
