import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotaService } from '../../service/nota';
import { ProdutoService } from '../../service/produto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nota-form',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './nota-form.html',
  styleUrl: './nota-form.css',
})
export class NotaFormComponent implements OnInit {

  notaForm: any = { numero: 0, dataEmissao: new Date().toISOString().split('T')[0], itens: [], valorTotal: 0 };
  produtoSelecionadoid: number | null = null;
  quantidadeSelecionada: number = 1;
  produtos: any[] = []; // O HTML usa 'produtos'

  constructor(
    private notaService: NotaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe(dados => {
      this.produtos = dados;
    });
  }

  salvar() {
    this.notaService.salvar(this.notaForm).subscribe({
      next: (res) => {
        alert('Nota Fiscal criada com sucesso!');
        this.limpar();
        this.notaService.notasAtualizadas.next(); // Avisa a lista que tem nota nova!
      },
      error: (err) => alert('Erro: ' + err.message)
    });
  }

  adicionarProduto() {
    if (!this.produtoSelecionadoid || this.quantidadeSelecionada <= 0) {
      alert("Selecione um produto e uma quantidade válida!");
      return;
    }

    // Achar o produto na lista para pegar a descrição
    const produto = this.produtos.find(p => p.id == this.produtoSelecionadoid);

    if (produto) {
      // Verifica se há saldo suficiente
      if (produto.saldo < this.quantidadeSelecionada) {
        alert("Erro: Produto esgotado ou saldo insuficiente!");
        return;
      }

      // Deduz do saldo visualmente na tela
      produto.saldo -= this.quantidadeSelecionada;

      const valorUnitario = produto.valor || 0;
      const valorTotalItem = valorUnitario * this.quantidadeSelecionada;

      this.notaForm.itens.push({
        produtoId: produto.id,
        produtoDescricao: produto.descricao, // Usado apenas na tela
        quantidade: this.quantidadeSelecionada,
        valorTotal: valorTotalItem
      });

      this.notaForm.valorTotal += valorTotalItem;

      // Reseta a seleção
      this.produtoSelecionadoid = null;
      this.quantidadeSelecionada = 1;
    }
  }

  limpar() {
    this.notaForm = { numero: 0, dataEmissao: new Date().toISOString().split('T')[0], itens: [], valorTotal: 0 };
    // Recarrega os dados do estoque para voltar ao normal caso o usuário não tenha salvo
    this.carregarProdutos();
  }
}