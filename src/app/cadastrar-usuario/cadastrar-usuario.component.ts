import { Component, Inject, signal} from '@angular/core';
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
import { Router } from '@angular/router';

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

  private authService = Inject(AuthService)
  
  options: FormGroup;
  mensagem: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);


  constructor(private fb: FormBuilder, private router: Router, private service: AuthService) {
    this.options = this.fb.group({
      hideRequiredControl: false,
      floatLabelControl: ['auto' as FloatLabelType],
      inputText: '',
      selectOption: '',
      nomecompleto:'',
      telefone: '',
      password:'',
      email: '',
    });

    console.log("service", this.authService)
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
    console.log('Texto:', this.options.get('nomecompleto')?.value);
    console.log('Opção Selecionada:', this.options.get('emailFormControl')?.value);
    console.log('telefone:', this.options.get('telefone')?.value);
    console.log('password:', this.options.get('password')?.value);
    // console.log('floatLabelControl:', this.options.get('telefone')?.value);


  }

  async cadastrarUsuario(){

    const nomeDigitado = this.options.get('nomecompleto')?.value;
    const email = this.options.get('email')?.value
    const telefone = this.options.get('telefone')?.value
    const senha = this.options.get('password')?.value



    const resultado = await this.authService.verificarERegistrarUsuario(email, senha, nomeDigitado);
    this.mensagem = resultado.success || resultado.error;
  }

  async criarUsuario() {

    const nomeDigitado = this.options.get('nomecompleto')?.value;
    const email = this.options.get('email')?.value
    const telefone = this.options.get('telefone')?.value
    const senha = this.options.get('password')?.value

    console.log('nomeDigitado:', this.options.get('nomecompleto')?.value);
    console.log('email:', this.options.get('email')?.value);
    console.log('telefone:', this.options.get('telefone')?.value);
    console.log('password:', this.options.get('password')?.value);

    try {
      const user = await this.service.register(email, senha); // Retorna um User diretamente
      console.log('Usuário criado:', user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }


  voltarLogin(){
    this.router.navigate(['login'])
  }
}
