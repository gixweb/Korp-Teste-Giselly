import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotaService } from '../../service/nota';
import { ProdutoService } from '../../service/produto';

@Component({
  selector: 'app-nota-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './nota-form.html',
  styleUrl: './nota-form.css',
})
export class NotaFormComponent implements OnInit {

  notaForm: any = { numero: 0, dataEmissao: '', itens: [], valorTotal: 0 };
  produtoSelecionadoid: number | null = null;
  quantidadeSelecionada: number = 1;
  produtos: any[] = []; // O HTML usa 'produtos'

  constructor(
    private notaService: NotaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    // Quando o form abre, carregamos os produtos para o "dropdown"
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
      // Cria o ItemNotaFiscal esperado pelo C# (com a descrição apenas pro HTML)
      this.notaForm.itens.push({
        produtoId: produto.id,
        produtoDescricao: produto.descricao, // Usado apenas na tela
        quantidade: this.quantidadeSelecionada,
        valorTotal: 0 // ValorTotal era legacy ou nós não controlamos preços, manda 0 ou a regra de negócios C# resolve
      });
      
      // Reseta a seleção
      this.produtoSelecionadoid = null;
      this.quantidadeSelecionada = 1;
    }
  }

  limpar() {
    this.notaForm = { numero: 0, dataEmissao: '', itens: [], valorTotal: 0 };
  }
}