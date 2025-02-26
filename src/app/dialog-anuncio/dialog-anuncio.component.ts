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
  dataFim: any,
  plataforma: ''
};



import { FormsModule } from '@angular/forms';
import { ProdutosServiceService } from '../services/produtos-service.service';
import { AnuncioService } from '../services/anuncios-service.service';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'app-dialog-anuncio',
  templateUrl: './dialog-anuncio.component.html',
  imports: [MatAutocompleteModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatCardModule, CommonModule, MatInputModule, MatButtonModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./dialog-anuncio.component.css']
})
export class DialogAnuncioComponent {
  produtoControl!: FormGroup;
  produtos: Produto[] = [];  // 🔹 Inicializa como array vazio
  // produtos$: Observable<Produto[]>;
  anuncio!: anuncio;
  anuncioEdita!: anuncio;
  dialog: any;
  constructor(public dialogRef: MatDialogRef<DialogAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private anuncioService: AnuncioService) {
  }

  ngOnInit() {
    this.produtos = this.data.produtos || [];
    // this.anuncioEdita = this.data.anuncio || [];
    

    if(this.anuncioEdita){
      console.log("Tem edição")
    }else{
      console.log("Nao tem edição")
    }

    


    console.log("anuncioEdita   " , this.anuncioEdita)
    this.produtoControl = this.fb.group({
      produto: ['', Validators.required],       // Produto obrigatório
      dataInicio: ['', Validators.required],    // Data de início obrigatória
      quantidadeDias: [1, [Validators.required, Validators.min(1)]], // Dias mínimo 1
      preco: ['', [Validators.required, Validators.min(1)]], // Valor obrigatório e mínimo 1
    });
    // this.produtos = this.data?.produtos && Array.isArray(this.data.produtos) ? this.data.produtos : [];
  }
  salvar() {
    if (this.produtoControl.valid) {
      console.log('====================================');
      console.log("Formulário válido");
      console.log('====================================');
      const quantDias = this.produtoControl.get('quantidadeDias')?.value

      console.log('====================================');
      console.log("Dias enviado ", quantDias);
      console.log("Dia inicio selecionado ", this.produtoControl.get('dataInicio')?.value)
      console.log('====================================');
      let dataInicio = this.produtoControl.get('dataInicio')?.value

      if (!dataInicio) {
        console.error("Erro: Data de início está indefinida");
        return;
      }
      // 🔹 Se `dataInicio` for um objeto `Date`, converte para string
    if (dataInicio instanceof Date) {
      dataInicio = dataInicio.toISOString().split('T')[0]; // "yyyy-MM-dd"
    }

       // Convertendo para string "yyyy-MM-dd"
    const dataInicioFormatada = dataInicio.toString().split('T')[0];
    const dataFimFormatada = this.calcularDataFim(dataInicioFormatada, quantDias);
    console.log("Data de início formatada:", dataInicio);
    this.anuncio = this.produtoControl.value;
    this.anuncio.dataInicio = dataInicio;
    this.anuncio.dataFim = this.calcularDataFim(dataInicio, quantDias);

    
   
    try {
      this.anuncioService.adicionarAnuncio(this.anuncio);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Erro ao salvar anúncio:', error);
    }

    }else{
      console.log('====================================');
      console.log("Formulário inválido");
      console.log('====================================');
    }
  }

  fechar() {
    this.dialogRef.close();
  }
  calcularDataFim(dataInicio: string, dias: number): string {
    let data = new Date(dataInicio);
  data.setDate(data.getDate() + dias);
  return data.toISOString().split('T')[0]; // Retorna "yyyy-MM-dd"
  }
  onCancel() {
    this.dialogRef.close();
  }

  formatDate(timestamp: Timestamp): string {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return date.toISOString().split('T')[0]; // Formato "yyyy-MM-dd"
    }
    return ''; // Retorna string vazia se não for um Timestamp
  }
}
