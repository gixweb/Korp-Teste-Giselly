import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Produto } from '../models/produto-model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:5149/api/Produto';
  
  // Criamos um "mensageiro" para avisar ou outros componentes que a lista mudou
  produtosAtualizados = new Subject<void>();
  
  // E outro "mensageiro" para transportar o dado da Lista para o Form na hora de Editar
  produtoParaEdicao = new Subject<Produto>();

  constructor(private http: HttpClient) { }

  salvar(produto: Produto): Observable<Produto> {
    // Verifique se a URL está correta (incluindo a porta 5149 do microsserviço de produtos)
    const API = 'http://localhost:5149/api/Produto';
    return this.http.post<Produto>(API, produto);
  }
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${id}`, produto);
  }

  editar(produto: any) { console.log('Editando', produto); }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}