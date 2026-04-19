import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../service/produto'; // Importa o serviço

@Component({
  selector: 'app-produto',
  imports: [CommonModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class ProdutoComponent {
  produtos: any[] = []; // Começa vazio
  // O Angular "injeta" o serviço aqui no construtor
  constructor(private service: ProdutoService) { }
  ngOnInit(): void {
    this.carregarProdutos();
    // Escuta os avisos do serviço: Sempre que alguém avisar que a lista mudou, nós recarregamos!
    this.service.produtosAtualizados.subscribe(() => {
      this.carregarProdutos();
    });
  }
  carregarProdutos() {
    // Chamamos o serviço e "nos escrevemos" (subscribe) para receber a resposta
    this.service.listar().subscribe({
      next: (dados) => {
        this.produtos = dados; // Quando os dados chegam, guardamos na variável
        console.log('Produtos carregados!', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }
  editar(p: any) {
    // Pegamos o produto da tabela e mandamos pelo mensageiro!
    this.service.produtoParaEdicao.next(p);
  }
  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.service.deletar(id).subscribe({
        next: () => {
          alert('Produto excluído!');
          this.carregarProdutos(); // Atualiza a lista
        },
        error: (err) => alert('Erro ao excluir: ' + err.message)
      });
    }
  }
}
