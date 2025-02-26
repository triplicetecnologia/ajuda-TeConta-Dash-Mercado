import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
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

  // Editar um anúncio existente
  async editarAnuncio(id: string, anuncio: Partial<Anuncio>): Promise<void> {
    const anuncioDocRef = doc(this.firestore, 'ANUNCIOS', id);
  
    // Verifica se as datas são válidas antes de converter
    if (anuncio.dataInicio && !isNaN(new Date(anuncio.dataInicio).getTime())) {
      anuncio.dataInicio = Timestamp.fromDate(new Date(anuncio.dataInicio));
    } else {
      console.error('Data de início inválida:', anuncio.dataInicio);
      return;
    }
  
    if (anuncio.dataFim && !isNaN(new Date(anuncio.dataFim).getTime())) {
      anuncio.dataFim = Timestamp.fromDate(new Date(anuncio.dataFim));
    } else {
      console.error('Data de fim inválida:', anuncio.dataFim);
      return;
    }
  
    return updateDoc(anuncioDocRef, { ...anuncio })
      .then(() => {
        console.log('Anúncio atualizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar anúncio:', error);
      });
  }
  

   // Excluir um anúncio
   async excluirAnuncio(id: string): Promise<void> {
    const anuncioDocRef = doc(this.firestore, 'ANUNCIOS', id);
    
    return deleteDoc(anuncioDocRef).then(() => {
      console.log('Anúncio excluído com sucesso!');
    }).catch(error => {
      console.error('Erro ao excluir anúncio:', error);
    });
  }
}
