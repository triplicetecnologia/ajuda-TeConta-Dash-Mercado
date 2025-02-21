import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';

interface Anuncio {
  dataFim: any;
  dataInicio: any;
  preco: number;
  produto: {
    descricao: string;
    id: string;
    nome: string;
  };
  produtoSelecionado: {
    name: string;
    uid: string;
  };
  quantidadeDias: number;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  

  private firestore: Firestore;
  private auth: Auth;
  private anunciosRef;


  // private anunciosRef = collection(this.firestore, 'ANUNCIOS');

  constructor() {
    this.firestore = inject(Firestore)
  this.auth = inject(Auth)
  this.anunciosRef = collection(this.firestore, 'ANUNCIOS');
   }

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

  getAnuncios(): Observable<{ ativos: Anuncio[]; expirados: Anuncio[] }> {
    const anunciosRef = collection(this.firestore, 'ANUNCIOS');

    return collectionData(anunciosRef, { idField: 'id' }).pipe(
      map((anuncios: any[]) => {
        const agora = new Date().getTime(); // Timestamp atual

        return {
          ativos: anuncios.filter(anuncio => anuncio.dataFim.toMillis() >= agora),
          expirados: anuncios.filter(anuncio => anuncio.dataFim.toMillis() < agora)
        };
      })
    );
  }
}
