import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import {ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AnuncioService } from '../services/anuncios-service.service';
@Component({
  selector: 'app-dialog-editar-anuncio',
  templateUrl: './dialog-editar-anuncio.component.html',
  imports:[MatAutocompleteModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, ReactiveFormsModule],
  styleUrls: ['./dialog-editar-anuncio.component.scss']
})
export class DialogEditarAnuncioComponent {
  anuncioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditarAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private anuncioService: AnuncioService
  ) {
    this.anuncioForm = this.fb.group({
      nome: [data.produto.nome || '', Validators.required],
      descricao: [data.produto.descricao || '', Validators.required],
      preco: [data.preco || '', [Validators.required, Validators.min(0)]],
      dataInicio: [
        data.dataInicio ? data.dataInicio.toDate() : '', 
        Validators.required
      ],
      dataFim: [
        data.dataFim ? data.dataFim.toDate() : '', 
        Validators.required
      ],
      quantidadeDias: [data.quantidadeDias || '', Validators.required],
    });
  }

  calcularDataFim(dataInicio: Date, dias: number): Date {
    let data = new Date(dataInicio);
    data.setDate(data.getDate() + dias);
    return data;
  }

  salvar(): void {
    if (this.anuncioForm.valid) {
      const anuncioEditado = this.anuncioForm.value;
      this.anuncioService.editarAnuncio(this.data.id, anuncioEditado).then(() => {
        this.dialogRef.close(anuncioEditado);
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
