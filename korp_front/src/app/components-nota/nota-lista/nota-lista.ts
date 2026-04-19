import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaService } from '../../service/nota';
import { Nota } from '../../models/nota-model';

@Component({
  selector: 'app-nota-lista',
  imports: [CommonModule],
  templateUrl: './nota-lista.html',
  styleUrl: './nota-lista.css',
})
export class NotaLista {
  notas: Nota[] = [];
  constructor(private service: NotaService) { }
  carregando: boolean = false;

  ngOnInit() {
    this.carregarNotas();
    this.service.notasAtualizadas.subscribe(() => {
      this.carregarNotas();
    });
  }
  carregarNotas() {
    this.service.listar().subscribe(dados => this.notas = dados);
  }
  imprimir(nota: Nota) {
    if (nota.id) {
      this.carregando = true; // Começa a girar o indicador
      this.service.imprimir(nota.id).subscribe({
        next: (res) => {
          alert('Nota impressa e estoque atualizado!');
          this.carregarNotas(); // Atualiza a lista para ver o novo status
          this.carregando = false;
        },
        error: (err) => {
          alert('Erro ao imprimir: ' + err.message);
          this.carregando = false;
        }
      });
    }
  }
  editar(nota: any) { console.log('Editando', nota); }
  excluir(nota: any) { console.log('Excluindo', nota); }
}
