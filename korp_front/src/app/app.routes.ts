import { Routes } from '@angular/router';
import { ProdutosPage } from './pages/produtos/produtos.page';
import { NotasPage } from './pages/notas/notas.page';

export const routes: Routes = [
  { path: 'produtos', component: ProdutosPage },
  { path: 'notes', component: NotasPage },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];
