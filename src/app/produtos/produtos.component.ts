import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProdutosServiceService } from '../services/produtos-service.service';
import { FormControl, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotificaoServiceService } from '../services/notificao-service.service';
import { DialogAnuncioComponent } from '../dialog-anuncio/dialog-anuncio.component';
import { AnuncioService } from '../services/anuncios-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

interface Segmento {
  name: string;

}


export interface Produto {
  id?: string;
  nome: string;
  produtoSelecionado: Segmento;

}



@Component({
  selector: 'app-produtos',
  imports: [MatTabsModule, MatTabsModule, MatAutocompleteModule, MatCardModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
})
export class ProdutosComponent implements OnInit {

  // private firestore = inject(Firestore)
  product = { nome: '', produtoSelecionado: '' };
  produtoForm: FormGroup;
  products: any[] = [];
  myControl = new FormControl<Segmento | null>(null);
  produtoSelecionadoId: any;
  alimentos: Segmento[] = [
    { name: 'Arroz' }, { name: 'Feijão' }, { name: 'Açúcar' }, { name: 'Sal' },
    { name: 'Óleo' }, { name: 'Farinha de trigo' }, { name: 'Farinha de mandioca' },
    { name: 'Macarrão' }, { name: 'Café' }, { name: 'Leite' }, { name: 'Manteiga' },
    { name: 'Margarina' }, { name: 'Pão' }, { name: 'Ovos' }, { name: 'Carne bovina' },
    { name: 'Frango' }, { name: 'Peixe' }, { name: 'Linguiça' }, { name: 'Presunto' },
    { name: 'Queijo' }, { name: 'Iogurte' }, { name: 'Creme de leite' }, { name: 'Leite condensado' },
    { name: 'Achocolatado' }, { name: 'Suco' }, { name: 'Refrigerante' }, { name: 'Água mineral' },
    { name: 'Feijão enlatado' }, { name: 'Milho enlatado' }, { name: 'Ervilha enlatada' },
    { name: 'Molho de tomate' }, { name: 'Maionese' }, { name: 'Ketchup' }, { name: 'Mostarda' },
    { name: 'Temperos (pimenta, orégano, louro, etc.)' }, { name: 'Alho' }, { name: 'Cebola' },
    { name: 'Batata' }, { name: 'Cenoura' }, { name: 'Tomate' }, { name: 'Alface' },
    { name: 'Couve' }, { name: 'Banana' }, { name: 'Maçã' }, { name: 'Laranja' },
    { name: 'Uva' }, { name: 'Melancia' }, { name: 'Outros' }
  ];
  anuncios!: Observable<any[]>; // Lista de anúncios

  filteredOptions!: Observable<Segmento[]>;
  editando = false;
  produtoSelecionado: Segmento | null = null;
  produtos$: Observable<Produto[]>; // Lista de produtos
  anunciosAtivos!: Observable<any[]>; // Anúncios ativos
  anunciosAguardando!: Observable<any[]>; // Anúncios aguardando início

  constructor(private fb: FormBuilder, private firebaseService: ProdutosServiceService,
    private notificadao: NotificaoServiceService,
    private anunciosService: AnuncioService,
    private dialog: MatDialog) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      produtoSelecionado: this.myControl
    });
    this.displayFn = this.displayFn.bind(this);
    this.produtos$ = this.firebaseService.getProdutos();
    this.anunciosAtivos = this.anunciosService.getAnunciosAtivos();
    this.anunciosAguardando = this.anunciosService.getAnunciosAguardando();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.name || '')),
      map(name => (name ? this._filter(name) : this.alimentos.slice()))
    );
  }

  private _filter(name: string): Segmento[] {
    const filterValue = name.toLowerCase();
    return this.alimentos.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(alimentos: Segmento): string {
    return alimentos ? alimentos.name : '';
  }
  async salvarProduto() {
    if (this.editando) {

      if (this.produtoForm.valid) {
        console.log("this.produtoSelecionadoId ##############", this.produtoSelecionadoId)
        this.firebaseService.updateProduto(this.produtoSelecionadoId, this.produtoForm.value).then((resultado) => {
          this.notificadao.mostrarMensagemSucesso("Produto atualizado com sucesso")
          console.log("produto atualizado ", resultado)
          this.limparFormulario();
        })
          .catch(erro => {
            this.notificadao.mostrarMensagem("Algo deu errado tente novamente mais tarde")
            console.log("erro ################", erro)
          })
        return
      }



    } else {
      if (this.produtoForm.valid) {
        // this.produtoForm.produtoSelecionado = this
        this.firebaseService.addProduct(this.produtoForm.value)
          .then((result) => {
            this.notificadao.mostrarMensagemSucesso("Produto criado com sucesso")
            console.log(result)
            this.limparFormulario();
          }).catch(erro => {
            this.notificadao.mostrarMensagemSucesso("Algo deu errado, tente novamente mair tarde")
            console.log("erro:", erro)
          })
      }
    }


  }

  onSubmit() {
    if (this.product.nome && this.product.produtoSelecionado) {
      this.product.produtoSelecionado
      this.firebaseService.addProduct(this.product).then(() => {
        // alert('Produto cadastrado com sucesso!');
        this.notificadao.mostrarMensagemSucesso("Produto cadastrado com sucesso")
        this.product = { nome: '', produtoSelecionado: '' };
      }).catch(erro => {
        console.log("Erro ##############", erro)
        this.notificadao.mostrarMensagemSucesso("Algo deu errado tente novamente mais tarde")
      })


    }
  }

  onOptionSelected(event: any) {
    const produtoSelecionado = event.option.value.name; // Apenas o nome
    this.produtoForm.patchValue({
      produtoSelecionado: produtoSelecionado
    });

    // Também atualiza o FormControl para evitar erros visuais no campo
    this.myControl.setValue(produtoSelecionado);
  }

  selecionarProduto(produto: any) {
    const produtoSegmentoSelecionado = produto.produtoSelecionado
    this.produtoSelecionadoId = produto.id;
    this.displayFn(produtoSegmentoSelecionado)
    this.produtoForm.patchValue({
      tipoAlimento: produtoSegmentoSelecionado,
      nome: produto.nome,
      descricao: produto.descricao
    });
    this.myControl.setValue(produto.produtoSelecionado);
    this.editando = true; // Altera o botão para "Atualizar"

  }

  limparFormulario() {
    this.produtoForm.reset(); // Reseta os campos do formulário
    this.editando = false; // Volta para modo de cadastro
    return;
  }

  excluirProduto() {
    // event.stopPropagation(); 
    if (this.produtoSelecionadoId) {
      this.firebaseService.excluirProduto(this.produtoSelecionadoId).then((rsultado) => {
        this.notificadao.mostrarMensagemSucesso("Produto excluído com sucesso")
        this.limparFormulario();
      }).catch(erro => {
        this.notificadao.mostrarMensagem("Não foi possível excluir o produto, tente novamente mais tarde")
        console.log("Erro ao excluir produto ", erro)
      });
    }
    this.produtos$ = this.firebaseService.getProdutos();
  }

  abrirDialogAnuncio() {


    this.produtos$.subscribe(produtos  =>{

      const dialogRef = this.dialog.open(DialogAnuncioComponent, {
        width: '400px',
        data: {produtos}
      });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     this.anunciosService.adicionarAnuncio(result);
      //   }
      // });
    })


  }

  abrirDialogProduto() : void {
    this.produtos$.subscribe(produtos  =>{

      const dialogRef = this.dialog.open(DialogAnuncioComponent, {
        width: '400px',
        data: {produtos}
      });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     this.anunciosService.adicionarAnuncio(result);
      //   }
      // });
    });
  }
}
