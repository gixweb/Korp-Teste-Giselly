import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Nota } from '../models/nota-model';

@Injectable({ providedIn: 'root' })
export class NotaService {
  private readonly API = 'http://127.0.0.1:5085/Notes';
  
  notasAtualizadas = new Subject<void>();
  
  constructor(private http: HttpClient) { }
  // Faltava este para a lista:
  listar(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.API, {
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    });
  }
  // Este para o formulário:
  salvar(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.API, nota);
  }
  // Este para o botão de imprimir:
  imprimir(id: number): Observable<Nota> {
    return this.http.post<Nota>(`${this.API}/${id}/imprimir`, {});
  }
}