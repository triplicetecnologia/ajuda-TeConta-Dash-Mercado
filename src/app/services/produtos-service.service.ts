import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, collectionData, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Produto } from '../models/produto';




interface Segmento {
  name: string;

}


// export interface Produto {
//   id?: string;
//   nome: string;
//   preco: number;
//   segmento: string; // Apenas o nome do segmento
//   empresa: string;  // Apenas o nome da empresa/loja
//   uid:string;

// }



@Injectable({
  providedIn: 'root'
})
export class ProdutosServiceService {

  private firestore = inject(Firestore)
  private auth = inject(Auth)
  private produtoSalva!: Produto

  constructor(private router: Router) { 
    

  }
  private produtoAdd = collection(this.firestore, "PRODUTOS_CADASTRADO_ANUNCIOS")
  async addProduct(product: any) {

    this.produtoSalva.nome = product.nome;


    if (!product.produtoSelecionado) {
      console.error('Erro: Nenhum produto foi selecionado!');
      return;
    }

    this.produtoSalva.segmento = product.produtoSelecionado.name;
    this.produtoSalva.uid=product.uid;
    this.produtoSalva.empresa = product.empresa;
    console.log("Produto antes de salvar", product);
    console.log("produtoSalva antes de salvar", this.produtoSalva);

    
    const user = this.auth.currentUser;

    if (user) {
      product.uid = user.uid;

      return addDoc(this.produtoAdd, product)
    } else {
      this.router.navigate(['/login'])
      throw new Error('Usuário não autenticado');

    }

    // return this.firestore.collection('products').add(product);
  }

  async atualizarProduto(id: string, produto: any) {
    const produtoRef = doc(this.firestore, 'PRODUTOS_CADASTRADO_ANUNCIOS', id); // Referência ao documento do Firestore
    return await updateDoc(produtoRef, produto); // Atualiza o produto existente
  }

  async excluirProduto(id: string) {
    // const produtoRef = doc(this.firestore, 'PRODUTOS_CADASTRADO_ANUNCIOS', id);

    try {
      console.log("Tentando excluir o produto com ID:", id);
      // const produtoRef = doc(this.firestore, 'PRODUTOS_CADASTRADO_ANUNCIOS', id);
      console.log("Documento excluído com sucesso!");
      return await deleteDoc(doc(this.firestore, 'PRODUTOS_CADASTRADO_ANUNCIOS', id));

    } catch (error) {
      console.log("Erro ao excluir", error)
    }


  }

  // Método para buscar todos os produtos
  getProdutos(): Observable<Produto[]> {
    const produtosRef = collection(this.firestore, 'PRODUTOS_CADASTRADO_ANUNCIOS');
    return collectionData(produtosRef, { idField: 'id' }) as Observable<Produto[]>;
  }

  // Método para atualizar um produto
  async updateProduto(id: string, data: Partial<Produto>): Promise<void> {
    const produtoRef = doc(this.firestore, 'PRODUTOS_CADASTRADO_ANUNCIOS', id);
    return await updateDoc(produtoRef, data);
  }

}
