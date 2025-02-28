import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LojaserviceService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private lojasCollection = collection(this.firestore, 'LOJAS_ANUNCIOS');

  constructor() {}

  async cadastrarLoja(lojaData: any) {
    const user = this.auth.currentUser;
    if (user) {
      lojaData.uid = user.uid;
      return addDoc(this.lojasCollection, lojaData);
    } else {
      throw new Error('Usuário não autenticado');
    }
  }

  async editarLoja(id: string, lojaData: any) {
    const lojaRef = doc(this.firestore, 'LOJAS_ANUNCIOS', id);
    return updateDoc(lojaRef, lojaData);
  }

  async excluirLoja(id: string) {
    const lojaRef = doc(this.firestore, 'LOJAS_ANUNCIOS', id);
    return deleteDoc(lojaRef);
  }

  async getLojasDoUsuario() {
    const user = this.auth.currentUser;
    if (!user) return [];

    const lojasQuery = query(this.lojasCollection, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(lojasQuery);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
