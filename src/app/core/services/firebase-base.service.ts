import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseBaseService {
  constructor(private firestore: Firestore) {}

  protected getCollection(path: string) {
    return collection(this.firestore, path);
  }

  protected getDocument(path: string, id: string) {
    return doc(this.firestore, `${path}/${id}`);
  }

  protected getList<T>(path: string): Observable<T[]> {
    const colRef = this.getCollection(path);
    return collectionData(colRef, { idField: 'id' }) as Observable<T[]>;
  }

  protected getOne<T>(path: string, id: string): Observable<T> {
    const docRef = this.getDocument(path, id);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }

  protected create<T>(path: string, data: T) {
    const colRef = this.getCollection(path);
    return addDoc(colRef, this.prepareDataForSave(data));
  }

  protected update<T>(path: string, id: string, data: Partial<T>) {
    const docRef = this.getDocument(path, id);
    return updateDoc(docRef, this.prepareDataForSave(data));
  }

  protected delete(path: string, id: string) {
    const docRef = this.getDocument(path, id);
    return deleteDoc(docRef);
  }

  protected queryCollection<T>(
    path: string,
    field: string,
    operator: any,
    value: any
  ): Observable<T[]> {
    const colRef = this.getCollection(path);
    const q = query(colRef, where(field, operator, value));
    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }

  private prepareDataForSave(data: any): any {
    if (!data) return data;

    const prepared = { ...data };

    // Convert Date objects to Firestore Timestamps
    Object.keys(prepared).forEach((key) => {
      if (prepared[key] instanceof Date) {
        prepared[key] = Timestamp.fromDate(prepared[key]);
      }
    });

    return prepared;
  }
}
