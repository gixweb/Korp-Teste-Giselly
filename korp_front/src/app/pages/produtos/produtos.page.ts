import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoFormComponent } from '../../components-produto/produto-form/produto-form';
import { ProdutoComponent } from '../../components-produto/produto/produto';

@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, ProdutoFormComponent, ProdutoComponent],
  template: `
    <div class="column" style="width: 100%; max-width: 800px; margin: auto;">
        <div class="card">
        <h2>📦 Cadastro de Produto</h2>
        <app-produto-form></app-produto-form>
        </div>

        <div class="card" style="margin-top: 20px;">
        <h2>📋 Lista de Estoque</h2>
        <app-produto></app-produto>
        </div>
    </div>
  `
})
export class ProdutosPage {}
