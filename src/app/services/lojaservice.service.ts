import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc , query, where, getDocs} from '@angular/fire/firestore';
// import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class LojaserviceService {
  private firestore = inject(Firestore)
  private auth = inject(Auth)

  constructor() {}

  // async uploadLogo(file: File): Promise<string> {
  //   const filePath = `logos_lojas/${file.name}`;
  //   const storageRef = ref(this.storage, filePath);
  //   await uploadBytes(storageRef, file);
  //   return getDownloadURL(storageRef);
  // }
  private lojasCollection = collection(this.firestore, 'LOJAS_ANUNCIOS');
  async cadastrarLoja(lojaData: any) {
    const user = this.auth.currentUser;
    if (user) {
      lojaData.uid = user.uid; // Associa a loja ao usuário autenticado
      return addDoc(this.lojasCollection, lojaData);
    } else {
      throw new Error('Usuário não autenticado');
    }
  }

  async getLojasDoUsuario() {
    const user = this.auth.currentUser;
    if (!user) return [];

    const lojasQuery = query(this.lojasCollection, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(lojasQuery);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}