import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Promocao } from '../models/promocao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocoesService {
  constructor(private firestore: Firestore) {}

  listarPromocoes(): Observable<Promocao[]> {
    const ref = collection(this.firestore, 'promocoes');
    return collectionData(ref, { idField: 'id' }) as Observable<Promocao[]>;
  }
}
