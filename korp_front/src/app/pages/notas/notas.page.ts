import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaFormComponent } from '../../components-nota/nota-form/nota-form';
import { NotaLista } from '../../components-nota/nota-lista/nota-lista';;

@Component({
  selector: 'app-notas-page',
  standalone: true,
  imports: [CommonModule, NotaFormComponent, NotaLista],
  template: `
    <div class="column" style="width: 100%; max-width: 800px; margin: auto;">
        <div class="card">
        <h2>🧾 Nova Nota Fiscal</h2>
        <app-nota-form></app-nota-form>
        </div>

        <div class="card" style="margin-top: 20px;">
        <h2>📜 Histórico de Vendas</h2>
        <app-nota-lista></app-nota-lista>
        </div>
    </div>
  `
})
export class NotasPage { }
