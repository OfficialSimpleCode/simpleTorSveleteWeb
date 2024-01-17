/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */



import { DocumentSnapshot, Firestore, Timestamp, Transaction, WriteBatch, collection, deleteField, doc, runTransaction, writeBatch, type DocumentData } from 'firebase/firestore';
import { getFirestore, increment } from 'firebase/firestore/lite';
import RealTimeDatabase from './real_time_data_base';



enum NumericCommands {
  decrement,
  increment
}


export default class FirestoreDataBase extends RealTimeDatabase {
  
  _firestore: Firestore;
  constructor() {
    super();
    this._firestore = getFirestore();
  }

  get getBatch():WriteBatch  {
    return writeBatch(this._firestore);
  }

  async commmitBatch(batch: WriteBatch):Promise<boolean>  {
    try {
      await batch.commit();
      return true;
    } catch (e) {
      console.error("Error while commit batch -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  async runTransaction(transacionCommands: (transaction: Transaction)=> Promise<boolean>):Promise<boolean>  {
    
    try {
      const result = await runTransaction(this._firestore,async (transaction) => {
        return await transacionCommands(transaction);
      });

      return result;
    } catch (e) {
      console.error("Error while run transaction -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionGet(transaction: Transaction , path: string , docId: string ):Promise<DocumentSnapshot<DocumentData>> {
    try {
      const collectionRef = collection(this._firestore,`${envKey}/${path}`);
      const docRef = doc(collectionRef,docId);
      const snapshot = await transaction.get(docRef);
      return snapshot;
    } catch (e) {
      console.error("Error while getting document in transaction -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  

  async transactionUpdateAsMap(transaction:Transaction , path: string, docId: string , fieldName: string , value: any):Promise<any> {
    try {
      const collectionRef = collection(this._firestore,`${envKey}/${path}`);
      const docRef = doc(collectionRef,docId);
      const updateData = {[fieldName]: value ? value : deleteField()};
      transaction.update(docRef, updateData);
    } catch (e) {
      console.error("Error while updating document in transaction -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionUpdateMultipleFieldsAsMap(transaction:Transaction, path:string, docId: string, data: Record<string, any>,insideEnvironments:boolean = true) {
    try {
      const collectionRef = collection(this._firestore,insideEnvironments ? `${envKey}/${path}` : path);
      const docRef = doc(collectionRef,docId);
      const updateData = this.organizeData(data);
      transaction.update(docRef, updateData);
    } catch (e) {
      console.error("Error while updating multiple fields in transaction -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionCreateDoc(transaction:Transaction, path:string , docId: string , value: Record<string, any>):Promise<any> {
    try {
      const collectionRef = collection(this._firestore,`${envKey}/${path}`);
      const docRef = doc(collectionRef,docId);
      transaction.set(docRef, value);
    } catch (e) {
      console.error("Error while creating document in transaction -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  async transactionSetAsMap(transaction:Transaction , path: string, docId: string , data: Record<string, any>):Promise<any> {
    try {
      const collectionRef = collection(this._firestore,`${envKey}/${path}`);
      const docRef = doc(collectionRef,docId);
      const setData = this.organizeData(data);
      transaction.set(docRef, setData, {merge: true});
    } catch (e) {
      console.error("Error while setting document as map in transaction -->", e);
      throw new Error(`Server Error: ${e}`);
    }
  }

  

  async updateMultipleFieldsInsideDocAsMap(batch:WriteBatch ,path:string ,docId:string ,data:any,insideEnvironments:boolean = true) {
    try {
      const collectionRef = collection(this._firestore,insideEnvironments ? `${envKey}/${path}` : path)
      const docRef = doc(collectionRef,docId);
      batch.update(docRef, this.organizeData(data));
    } catch (e) {
      console.error("Error while updating the batch -->", e);
      throw new Error(`Server Error: ${e}`);
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

 
  get currentTimestamp():Timestamp {
    return Timestamp.now();
  };
  
}
