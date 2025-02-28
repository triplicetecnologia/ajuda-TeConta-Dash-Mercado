import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import { LojaserviceService } from '../services/lojaservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CpfCnpjValidator } from './cpf-cnpj.validator';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-loja',
  imports: [MatTabGroup,MatTabsModule, MatCardModule, MatIconModule,NgxMaskDirective , MatExpansionModule, MatButtonModule,
    MatToolbarModule, MatListModule, MatFormFieldModule , MatInputModule , ReactiveFormsModule, MatSelectModule, CommonModule
  ],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit{
  lojaForm!: FormGroup;
  categorias = ['Supermercado', 'Padaria', 'Açougue', 'Hortifruti', 'Farmácia', 'Outros'];
  logoLoja: File | null = null;
  private lojaService = inject(LojaserviceService)
  lojas: any[] = [];
  readonly panelOpenState = signal(false);
  lojaEditando: any = null; // Para saber se está editando uma loja
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;  // Adicionando referência à aba


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.lojaForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', [Validators.required, CpfCnpjValidator.validar]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      descricao: ['']
    });
  }
  ngOnInit() {
    this.carregarLojas();
  }

  onFileSelected(event: any) {
    this.logoLoja = event.target.files[0];
  }

  async cadastrarLoja() {
    if (this.lojaForm.valid) {
      const lojaData = { ...this.lojaForm.value, logo: '', latitude: null, longitude: null };
      
      const enderecoCompleto = `${lojaData.rua}, ${lojaData.numero}, ${lojaData.bairro}, ${lojaData.cidade}, ${lojaData.estado}, ${lojaData.cep}`;
      const enderecoLatitude = `${lojaData.rua}, ${lojaData.cidade}`
      
      const coordenadas = await this.obterCoordenadas(enderecoLatitude);
      
      if (coordenadas) {
        lojaData.latitude = coordenadas.lat;
        lojaData.longitude = coordenadas.lng;
      }
  
      this.lojaService.cadastrarLoja(lojaData).then(() => {
        alert('Loja cadastrada com sucesso!');
        this.lojaForm.reset();
      }).catch(error => {
        console.error('Erro ao cadastrar loja:', error);
      });
    }
  }

  buscarEndereco() {
    const cep = this.lojaForm.get('cep')?.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        dados => {
          if (!dados.erro) {
            this.lojaForm.patchValue({
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf
            });
          } else {
            alert('CEP não encontrado!');
          }
        },
        erro => {
          console.error('Erro ao buscar CEP:', erro);
          alert('Erro ao buscar o CEP. Verifique a conexão.');
        }
      );
    }
  }

  async carregarLojas() {
    try {
      this.lojas = await this.lojaService.getLojasDoUsuario();
      console.log("Loja retornada: " , this.lojas)
    } catch (error) {
      console.error("Erro ao carregar lojas: ", error);
    }
  }


  async obterCoordenadas(endereco: string): Promise<{ lat: number, lng: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;    
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
  
      if (dados.length > 0) {
        return {
          lat: parseFloat(dados[0].lat),
          lng: parseFloat(dados[0].lon),
        };
      } else {
        console.error("Nenhuma coordenada encontrada para o endereço.");
        return null;
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }


  editarLoja(loja: any) {
    // Preenche o formulário com os dados da loja para edição
    this.lojaForm.patchValue({
      nome: loja.nome,
      email: loja.email,
      descricao: loja.descricao
    });
    this.lojaEditando = loja;
  }

  excluirLoja(id: string) {
    if (confirm('Tem certeza que deseja excluir esta loja?')) {
      this.lojaService.excluirLoja(id).then(() => {
        alert('Loja excluída com sucesso!');
        this.carregarLojas();
      }).catch(error => {
        console.error('Erro ao excluir loja:', error);
      });
    }
  }

  
}
