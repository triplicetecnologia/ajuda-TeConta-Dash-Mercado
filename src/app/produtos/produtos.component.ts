import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-produtos',
  imports: [MatTabsModule,MatTabsModule, MatCardModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule,],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  // private firestore = inject(Firestore)

  produtoForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [null, Validators.required],
      categoria: ['']
    });
  }

  async salvarProduto() {
    if (this.produtoForm.valid) {
      // const produtoRef = collection(this.firestore, 'produtos');
      // await addDoc(produtoRef, this.produtoForm.value);
      // alert('Produto cadastrado com sucesso!');
      // this.produtoForm.reset();
    }
  }
}
