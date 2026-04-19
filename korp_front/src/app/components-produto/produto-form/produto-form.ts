import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto-model';
import { ProdutoService } from '../../service/produto';


@Component({
  selector: 'app-produto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css',
})
export class ProdutoFormComponent {
  @Input() produtoForm: Produto = { codigo: '', descricao: '', saldo: 0 };
  produtos: Produto[] = [];
  constructor(private service: ProdutoService) { }

  ngOnInit(): void {
    // Escuta o "pedido" de edição vindo da lista
    this.service.produtoParaEdicao.subscribe((p) => {
      this.produtoForm = { ...p };
    });
  }

  limpar() {
    this.produtoForm = { id: undefined, codigo: '', descricao: '', saldo: 0 };
  }

  enviar() {
    // Se o ID for 0, null ou undefined, ele entende como "novo"
    console.log('Dados que estou enviando:', this.produtoForm);
    if (this.produtoForm.id && this.produtoForm.id !== 0) {
      this.service.atualizar(this.produtoForm.id, this.produtoForm).subscribe({
        next: (res) => {
          alert('Produto atualizado!');
          this.limpar();
          this.service.produtosAtualizados.next(); // Importante para atualizar a tabela!
        },
        error: (err) => alert('Erro ao atualizar: ' + err.message)
      });
    } else {
      // Garanta que o ID não vá como 0 para o C# se for um novo cadastro
      const dadosParaSalvar = { ...this.produtoForm };
      delete dadosParaSalvar.id;

      this.service.salvar(dadosParaSalvar).subscribe({
        next: (res) => {
          alert('Produto salvo com sucesso!');
          this.limpar();
          this.service.produtosAtualizados.next(); // Avisa a lista para se atualizar
        },
        error: (err) => alert('Erro ao salvar: ' + err.message)
      });
    }
  }
}
