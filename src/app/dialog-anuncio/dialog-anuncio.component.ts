import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface anuncio {
  produtoNome: '',
  preco: '',
  dataInicio: '',
  dataFim: '',
  plataforma: ''
};



import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dialog-anuncio',
  templateUrl: './dialog-anuncio.component.html',
  imports: [MatAutocompleteModule, MatFormFieldModule, CommonModule, MatInputModule, MatButtonModule, MatDatepickerModule, FormsModule, ReactiveFormsModule ],
  styleUrls: ['./dialog-anuncio.component.css']
})
export class DialogAnuncioComponent {
  produtoControl = new FormControl();
  produtosFiltrados: Observable<any[]>;
  // produtoControl = new FormControl<anuncio | null>(null);
  anuncio = {
    produtoNome: '',
    preco: '',
    dataInicio: '',
    dataFim: '',
    plataforma: ''
  };
  constructor(public dialogRef: MatDialogRef<DialogAnuncioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.produtosFiltrados = this.produtoControl.valueChanges.pipe(
      startWith(''),
      map(value => data.produtos.filter((prod: { nome: string; }) => prod.nome.toLowerCase().includes(value.toLowerCase())))
    );
  }

  selecionarProduto(event: any) {
    this.anuncio.produtoNome = event.option.value;
  }

  salvarAnuncio() {
    this.dialogRef.close(this.anuncio);
  }
}
