/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */

import { logger } from "$lib/consts/application_general";
import { envKey } from "$lib/consts/db";
import { firebaseConfig } from "$lib/firebase_config";
import AppErrorsHelper from "$lib/helpers/app_errors";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  DocumentSnapshot,
  Firestore,
  Timestamp,
  Transaction,
  WriteBatch,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  runTransaction,
  writeBatch,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import RealTimeDatabase from "./real_time_data_base";

enum NumericCommands {
  decrement,
  increment,
}

export default class FirestoreDataBase extends RealTimeDatabase {
  _firestore: Firestore;
  constructor() {
    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    super();
    this._firestore = getFirestore();
  }

  get getBatch(): WriteBatch {
    return writeBatch(this._firestore);
  }

  async getDocSRV({
    path,
    docId,
    insideEnviroments = true,
  }: {
    path: string;
    docId: string;
    insideEnviroments: boolean;
  }): Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined> {
    try {
      const collectionRef = collection(
        this._firestore,
        insideEnviroments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);
      return await getDoc(docRef);
    } catch (e) {
      if (e instanceof Error) {
        logger.error(e.message);
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.message,
        });
        throw e;
      }
    }
  }

  async getAllDocsInsideCollection(
    path: string
  ): Promise<Record<string, any>[]> {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docs = await getDocs(collectionRef);

      return docs.docs.map((doc) => doc.data()) as Record<string, any>[];
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
        throw e;
      }
      return [];
    }
  }

  async commmitBatch(batch: WriteBatch): Promise<boolean> {
    try {
      await batch.commit();
      return true;
    } catch (e) {
      logger.error("Error while commit batch -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }

      throw new Error(`Server Error: ${e}`);
    }
  }

  async runTransaction(
    transacionCommands: (transaction: Transaction) => Promise<boolean>
  ): Promise<boolean> {
    try {
      const result = await runTransaction(
        this._firestore,
        async (transaction) => {
          return await transacionCommands(transaction);
        }
      );

      return result;
    } catch (e) {
      console.error("Error while run transaction -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }

      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionGet(
    transaction: Transaction,
    path: string,
    docId: string
  ): Promise<DocumentSnapshot<DocumentData>> {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docRef = doc(collectionRef, docId);
      const snapshot = await transaction.get(docRef);
      return snapshot;
    } catch (e) {
      console.error("Error while getting document in transaction -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }

      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionUpdateAsMap({
    transaction,
    path,
    docId,
    fieldName,
    value,
  }: {
    transaction: Transaction;
    path: string;
    docId: string;
    fieldName: string;
    value: any;
  }): Promise<any> {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docRef = doc(collectionRef, docId);
      const updateData = { [fieldName]: value ? value : deleteField() };
      transaction.update(docRef, updateData);
    } catch (e) {
      logger.error("Error while updating document in transaction -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }

      throw new Error(`Server Error: ${e}`);
    }
  }

  async setAsMap({
    batch,
    path,
    docId,
    data,
    insideEnviroments = true,
  }: {
    batch: WriteBatch;
    path: string;
    docId: string;
    data: any;
    insideEnviroments?: boolean;
  }) {
    /* create doc if doesn't exist */
    try {
      const collectionRef = collection(
        this._firestore,
        insideEnviroments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);
      batch.set(docRef, data, { merge: true });
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw e;
    }
  }

  async transactionUpdateMultipleFieldsAsMap({
    transaction,
    path,
    docId,
    data,
    insideEnvironments = true,
  }: {
    transaction: Transaction;
    path: string;
    docId: string;
    data: Record<string, any>;
    insideEnvironments?: boolean;
  }) {
    try {
      const collectionRef = collection(
        this._firestore,
        insideEnvironments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);
      const updateData = this.organizeData(data);
      transaction.update(docRef, updateData);
    } catch (e) {
      console.error(
        "Error while updating multiple fields in transaction -->",
        e
      );
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }

      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionCreateDoc({
    transaction,
    path,
    docId,
    value,
  }: {
    transaction: Transaction;
    path: string;
    docId: string;
    value: Record<string, any>;
  }): Promise<any> {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docRef = doc(collectionRef, docId);
      transaction.set(docRef, value);
    } catch (e) {
      logger.error("Error while creating document in transaction -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionSetAsMap({
    transaction,
    path,
    docId,
    data,
  }: {
    transaction: Transaction;
    path: string;
    docId: string;
    data: Record<string, any>;
  }): Promise<any> {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docRef = doc(collectionRef, docId);
      const setData = this.organizeData(data);
      transaction.set(docRef, setData, { merge: true });
    } catch (e) {
      logger.error("Error while setting document as map in transaction -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw new Error(`Server Error: ${e}`);
    }
  }

  async deleteDoc({
    batch,
    path,
    docId,
  }: {
    batch: WriteBatch;
    path: string;
    docId: string;
  }) {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docRef = doc(collectionRef, docId);
      batch.delete(docRef);
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }

      throw e;
    }
  }

  async setDoc({
    batch,
    path,
    docId,
    valueToSet,
    insideEnviroments = true,
  }: {
    batch: WriteBatch;
    path: string;
    docId: string;
    valueToSet: Record<string, any>;
    insideEnviroments?: boolean;
  }) {
    try {
      const collectionRef = collection(
        this._firestore,
        insideEnviroments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);
      batch.set(docRef, valueToSet);
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw e;
    }
  }
  async createDoc({
    batch,
    path,
    docId,
    valueAsJson,
    insideEnviroments = true,
    mergeIfExist = false,
  }: {
    batch: WriteBatch;
    path: string;
    docId: string;
    valueAsJson: any;
    insideEnviroments: boolean;
    mergeIfExist?: boolean;
  }) {
    try {
      const options = mergeIfExist ? { merge: true } : null;
      const collectionRef = collection(
        this._firestore,
        insideEnviroments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);
      batch.set(docRef, valueAsJson, { merge: mergeIfExist });
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw e;
    }
  }

  async updateFieldInsideDocAsMap({
    batch,
    path,
    docId,
    value,
    fieldName,
    command,
    insideEnviroments = true,
  }: {
    batch: WriteBatch;
    path: string;
    docId: string;

    value: any;
    fieldName: string;
    command?: NumericCommands | null;
    insideEnviroments?: boolean;
  }) {
    try {
      const collectionRef = collection(
        this._firestore,
        insideEnviroments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);

      if (command === null) {
        batch.update(docRef, { [fieldName]: value ?? deleteField() });
      } else {
        batch.update(docRef, {
          [fieldName]:
            command === NumericCommands.increment
              ? increment(1)
              : increment(-1),
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw e;
    }
  }

  async updateMultipleFieldsInsideDocAsMap({
    batch,
    path,
    docId,
    data,
    insideEnviroments = true,
  }: {
    batch: WriteBatch;
    path: string;
    docId: string;
    data: any;
    insideEnviroments?: boolean;
  }) {
    try {
      const collectionRef = collection(
        this._firestore,
        insideEnviroments ? `${envKey}/${path}` : path
      );
      const docRef = doc(collectionRef, docId);
      batch.update(docRef, this.organizeData(data));
    } catch (e) {
      logger.error("Error while updating the batch -->", e);
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.toString(),
        });
      }
      throw new Error(`Server Error: ${e}`);
    }
  }

  docListener({
    path,
    docId,
    onChanged,
  }: {
    path: string;
    docId: string;
    onChanged: (snapshot: DocumentSnapshot<DocumentData>) => void;
  }): Unsubscribe {
    try {
      const collectionRef = collection(this._firestore, `${envKey}/${path}`);
      const docRef = doc(collectionRef, docId);
      return onSnapshot(docRef, onChanged);
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.serverError,
          details: e.message,
        });
      }

      throw e;
    }
  }

  organizeData(data: Record<string, any>): Record<string, any> {
    var organizedData: Record<string, any> = {};

    Object.entries(data).forEach(([fieldName, value]) => {
      let organizedValue: any = value;

      if (organizedValue === null) {
        organizedValue = deleteField();
      }

      // Replace NumericCommands with the actual type of NumericCommands
      if (organizedValue === NumericCommands.increment) {
        organizedValue = increment(1);
      }

      // Replace NumericCommands with the actual type of NumericCommands
      if (organizedValue === NumericCommands.decrement) {
        organizedValue = increment(-1);
      }

      organizedData[fieldName] = organizedValue;
    });

    return organizedData;
  }

  get currentTimestamp(): Timestamp {
    return Timestamp.now();
  }
}
