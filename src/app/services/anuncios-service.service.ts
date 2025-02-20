import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  private firestore = inject(Firestore)
  private auth = inject(Auth)


  private anunciosRef = collection(this.firestore, 'ANUNCIOS');

  constructor() { }

  // Adiciona um novo anúncio
  async adicionarAnuncio(anuncio: any): Promise<void> {
    anuncio.dataInicio = Timestamp.fromDate(new Date(anuncio.dataInicio));
    anuncio.dataFim = Timestamp.fromDate(new Date(anuncio.dataFim));

    const user = this.auth.currentUser;

    if (user) {
      anuncio.uid = user.uid;

      return addDoc(this.anunciosRef, anuncio).then(() => {
        console.log('Anúncio cadastrado com sucesso!');
      });
    } else {
     
    }


   
  }

  // Retorna os anúncios ativos (dataInicio <= hoje <= dataFim)
  getAnunciosAtivos(): Observable<any[]> {
    const hoje = Timestamp.fromDate(new Date());
    const q = query(this.anunciosRef, where('dataInicio', '<=', hoje), where('dataFim', '>=', hoje));
    return collectionData(q, { idField: 'id' });
  }

  // Retorna os anúncios que ainda não começaram (dataInicio > hoje)
  getAnunciosAguardando(): Observable<any[]> {
    const hoje = Timestamp.fromDate(new Date());
    const q = query(this.anunciosRef, where('dataInicio', '>', hoje));
    return collectionData(q, { idField: 'id' });
  }
}
