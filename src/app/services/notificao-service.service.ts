import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificaoServiceService {

  constructor(private snackBar: MatSnackBar) {}

  mostrarMensagem(mensagem: string, duracao: number = 3000) {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao, // Tempo de exibição (3 segundos)
      horizontalPosition: 'end', // Alinhado à direita
      verticalPosition: 'top', // Alinhado no topo
      panelClass: ['snackbar-custom'], // Classe CSS opcional
    });
  }
}
