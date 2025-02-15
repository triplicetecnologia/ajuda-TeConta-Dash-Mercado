import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificaoServiceService {

  constructor(private snackBar: MatSnackBar) {}

  mostrarMensagem(mensagem: string, duracao: number = 3000) {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao, // Tempo de exibição (3 segundos)
      horizontalPosition: 'center', // Alinhado à direita
      verticalPosition: 'top', // Alinhado no topo
      panelClass: [], // Remove qualquer classe personalizada
  politeness: 'assertive', // Garante que a mensagem seja lida imediatamente // Classe CSS opcional
    });
  }


  mostrarMensagemSucesso(mensagem: string, duracao: number = 3000) {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao, // Tempo de exibição (3 segundos)
      horizontalPosition: 'center', // Alinhado à direita
      verticalPosition: 'top', // Alinhado no topo
      panelClass: ['snackbar-sucesso'], // Classe CSS opcional
    });
  }
}
