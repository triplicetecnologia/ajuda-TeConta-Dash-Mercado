import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

interface Segmento {
  name: string;

}



export interface Produto {
  id?: string;
  nome: string;
  produtoSelecionado: Segmento;

}


export interface anuncio {
  produtoNome: '',
  preco: '',
  dataInicio: '',
  dataFim: '',
  plataforma: ''
};



import { FormsModule } from '@angular/forms';
import { ProdutosServiceService } from '../services/produtos-service.service';
@Component({
  selector: 'app-dialog-anuncio',
  templateUrl: './dialog-anuncio.component.html',
  imports: [MatAutocompleteModule,MatDialogModule, MatSelectModule, MatFormFieldModule, MatCardModule, CommonModule, MatInputModule, MatButtonModule, MatDatepickerModule, FormsModule, ReactiveFormsModule ],
  styleUrls: ['./dialog-anuncio.component.css']
})
export class DialogAnuncioComponent {
  produtoControl!: FormGroup;
  produtos: Produto[] = [];  // 🔹 Inicializa como array vazio
  // produtos$: Observable<Produto[]>;
  

  constructor(public dialogRef: MatDialogRef<DialogAnuncioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder) {
  }
  
  ngOnInit() {
    this.produtos = this.data.produtos || [];


    this.produtoControl = this.fb.group({
      produto: [''],
      dataInicio: ['', Validators.required],
      diasDuracao: ['', [Validators.required, Validators.min(1)]],
      preco: ['', [Validators.required, Validators.min(0)]],
      quantidadeDias: ['', Validators.required]
    });
    // this.produtos = this.data?.produtos && Array.isArray(this.data.produtos) ? this.data.produtos : [];
  }
  salvar() {
    if (this.produtoControl.valid) {
      this.dialogRef.close(this.produtoControl.value);
    }
  }

  fechar() {
    this.dialogRef.close();
  }
}
