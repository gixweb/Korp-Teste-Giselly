import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../models/produto-model';

@Component({
  selector: 'app-produto-form',
  imports: [],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css',
})
export class ProdutoFormComponent {
  produtoForm = { id: number | undefined | null = undefined, nome: '', preco: 0, quantidade: 0 };
  produtos: Produto[] = [];

  salvar() {
    if (this.produtoForm.id) {
      // Lógica para EDITAR (Update)
      console.log('Editando produto:', this.produtoForm);
    } else {
      // Lógica para CADASTRAR (Create)
      this.produtoForm.id = this.produtos.length + 1;
      this.produtos.push({ ...this.produtoForm });
    }
    this.limpar();
  }

  editar(p: any) {
    this.produtoForm = { ...p }; // "Copia" os dados para o formulário
  }

  limpar() {
    this.produtoForm = { id: null, nome: '', preco: 0 };
  }
}
