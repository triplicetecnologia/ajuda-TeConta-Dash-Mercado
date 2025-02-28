import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Segmento {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SegmentoService {
  private collectionName = 'segmentos';

  constructor(private firestore: AngularFirestore) {}

  // Buscar todos os segmentos do Firestore
  getSegmentos(): Observable<Segmento[]> {
    return this.firestore.collection<Segmento>(this.collectionName)
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }
}
