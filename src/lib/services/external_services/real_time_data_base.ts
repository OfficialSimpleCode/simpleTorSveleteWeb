/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
import { envKey } from "$lib/consts/db";
import {
  DataSnapshot,
  Database,
  get,
  getDatabase,
  increment,
  onValue,
  ref,
  remove,
  set,
  update,
  type Unsubscribe,
} from "firebase/database";

enum NumericCommands {
  Increment = "increment",
  Decrement = "decrement",
}

export default class RealTimeDatabase {
  _db: Database;
  constructor() {
    this._db = getDatabase();
  }

  async getChild({ childPath }: { childPath: string }): Promise<DataSnapshot> {
    try {
      const childRef = ref(this._db, `${envKey}/${childPath}`);
      return await get(childRef);
    } catch (e) {
      //AppErrors().addError({ error: Errors.serverError, details: e.toString() });
      throw e;
    }
  }

  async updateChild({
    childPath,
    data,
  }: {
    childPath: string;
    data: any;
  }): Promise<boolean> {
    try {
      const childRef = ref(this._db, `${envKey}/${childPath}`);
      await update(childRef, data);
      return true;
    } catch (e) {
      // logger.e(`Error while updating the child --> ${e}`);
      // AppErrors().addError({ error: Errors.serverError, details: e.toString() });
      return false;
    }
  }

  async removeChild({ childPath }: { childPath: string }): Promise<boolean> {
    try {
      const childRef = ref(this._db, `${envKey}/${childPath}`);
      await remove(childRef);
      return true;
    } catch (e) {
      // logger.e(`Error while removing the child --> ${e}`);
      // AppErrors().addError({ error: Errors.serverError, details: e.toString() });
      return false;
    }
  }

  async incrementNumberChild({
    childPath,
    valueId,
    delta,
    command,
  }: {
    childPath: string;
    valueId: string;
    delta: number;
    command: NumericCommands;
  }): Promise<boolean> {
    try {
      if (command === NumericCommands.Decrement) {
        delta = -delta;
      }
      const data = { [valueId]: increment(delta) };
      const childRef = ref(this._db, `${envKey}/${childPath}`);

      await update(childRef, data);
      return true;
    } catch (e) {
      // logger.e(`Error while updating the child --> ${e}`);
      // AppErrors().addError({ error: Errors.serverError, details: e.toString() });
      return false;
    }
  }

  async incrementMultipleNumberChild({
    childPath,
    data,
  }: {
    childPath: string;
    data: Record<string, number>;
  }): Promise<boolean> {
    try {
      const fixedData: Record<string, any> = {};
      for (const [key, value] of Object.entries(data)) {
        fixedData[key] = increment(value);
      }
      const childRef = ref(this._db, `${envKey}/${childPath}`);
      await update(childRef, fixedData);
      return true;
    } catch (e) {
      // logger.e(`Error while updating the child --> ${e}`);
      // AppErrors().addError({ error: Errors.serverError, details: e.toString() });
      return false;
    }
  }

  listenToChild({
    childPath,
    callback,
  }: {
    childPath: string;
    callback: (snapshot: DataSnapshot) => unknown;
  }): Unsubscribe {
    const childRef = ref(this._db, `${envKey}/${childPath}`);
    return onValue(childRef, callback);
  }

  async setChild({
    childPath,
    data,
  }: {
    childPath: string;
    data: any;
  }): Promise<boolean> {
    try {
      const childRef = ref(this._db, `${envKey}/${childPath}`);
      await set(childRef, data);
      return true;
    } catch (e) {
      // logger.e(`Error while updating the child --> ${e}`);
      // AppErrors().addError({ error: Errors.serverError, details: e.toString() });
      return false;
    }
  }
}
