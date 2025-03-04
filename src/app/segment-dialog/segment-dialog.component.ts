import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as XLSX from 'xlsx';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-segment-dialog',
  imports:[MatChipsModule, MatTableModule, MatAutocompleteModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatCardModule, CommonModule, MatInputModule, MatButtonModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './segment-dialog.component.html',
  styleUrls: ['./segment-dialog.component.scss']
})
export class SegmentDialogComponent {
  novoSegmento: string = '';
  segmentos: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<SegmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Método para processar o upload da planilha
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      this.segmentos = json.slice(1).map((row: any) => row[0]).filter((name: string) => name);
    };
    reader.readAsArrayBuffer(file);
  }

  // Adiciona um segmento manualmente
  addSegmento() {
    if (this.novoSegmento.trim()) {
      this.segmentos.push(this.novoSegmento.trim());
      this.novoSegmento = '';
    }
  }

  // Confirma e retorna os segmentos cadastrados
  confirmar() {
    this.dialogRef.close(this.segmentos);
  }

  // Cancela o diálogo
  cancelar() {
    this.dialogRef.close();
  }
}
