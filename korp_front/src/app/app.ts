import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotaFormComponent } from './components-nota/nota-form/nota-form';
import { NotaLista } from './components-nota/nota-lista/nota-lista';
import { ProdutoFormComponent } from './components-produto/produto-form/produto-form';
import { ProdutoComponent } from './components-produto/produto/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet, NotaFormComponent, NotaLista, ProdutoFormComponent, ProdutoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('korp_front');
}
