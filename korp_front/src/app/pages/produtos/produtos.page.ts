import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoFormComponent } from '../../components-produto/produto-form/produto-form';
import { ProdutoComponent } from '../../components-produto/produto/produto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, ProdutoFormComponent, ProdutoComponent, MatButtonModule],
  template: `
    <div style="display: flex; gap: 20px; align-items: flex-start; max-width: 1200px; margin: auto; padding: 20px;">
        
        <div class="card" style="flex: 1; min-width: 350px;">
            <h2>📦 Cadastro de Produto</h2>
            <app-produto-form></app-produto-form>
        </div>

        <div class="card" style="flex: 2; width: 100%; overflow-x: auto;">
            <h2>📋 Lista de Estoque</h2>
            <app-produto></app-produto>
        </div>
        
    </div>
  `
})
export class ProdutosPage { }
