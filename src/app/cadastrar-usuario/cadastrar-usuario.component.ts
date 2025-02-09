import { Component, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatCardModule // <-- Adicionado aqui
    ],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css'
})
export class CadastrarUsuarioComponent {

  options: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private fb: FormBuilder) {
    this.options = this.fb.group({
      hideRequiredControl: false,
      floatLabelControl: ['auto' as FloatLabelType],
      inputText: '',
      selectOption: '',
      nomecompleto:'',
    });
  }

  matcher = {
    isErrorState: (control: FormControl | null) => {
      return !!(control && control.invalid && control.touched);
    }
  };

  hideRequired(): boolean {
    return this.options.get('hideRequiredControl')?.value;
  }

  floatLabel(): FloatLabelType {
    return this.options.get('floatLabelControl')?.value as FloatLabelType; // ✅ Correção aqui
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

//   criarUsuarioViaGoogle(){
//     this.auth.loginWithGoogle().then((result)=>{
// console.log("resultado ", result)
//     }).catch(erro=>{
//       console.log("erro ", erro)
//     })
//   }

  // Captura os valores e exibe no console
  logValues(): void {
    console.log('Texto:', this.options.get('inputText')?.value);
    console.log('Opção Selecionada:', this.options.get('selectOption')?.value);
    console.log('floatLabelControl:', this.options.get('floatLabelControl')?.value);
  }
}
