import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaFormComponent } from '../../components-nota/nota-form/nota-form';
import { NotaLista } from '../../components-nota/nota-lista/nota-lista';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notas-page',
  standalone: true,
  imports: [CommonModule, NotaFormComponent, NotaLista, MatButtonModule],
  template: `
    <div style="display: flex; gap: 20px; align-items: flex-start; max-width: 1200px; margin: auto; padding: 20px;">
        <div class="card" style="flex: 1; min-width: 350px;">
            <h2>🧾 Nova Nota Fiscal</h2>
            <app-nota-form></app-nota-form>
        </div>

        <div class="card" style="flex: 2; width: 100%; overflow-x: auto;">
            <h2>📜 Histórico de Vendas</h2>
            <app-nota-lista></app-nota-lista>
        </div>
        
    </div>
  `
})
export class NotasPage { }
