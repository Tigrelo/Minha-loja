import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:8080/api/veiculos';

  // Função auxiliar para criar os cabeçalhos e evitar repetição de código
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:12345'),
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }

  // --- LER ---
  getVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // --- CRIAR ---
  salvarVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo, { headers: this.getHeaders() });
  }

  // --- ATUALIZAR (O que estava faltando) ---
  atualizarVeiculo(id: number, veiculo: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Ex: /api/veiculos/1
    return this.http.put<any>(url, veiculo, { headers: this.getHeaders() });
  }

  // --- DELETAR (O que provavelmente daria erro em seguida) ---
  deletarVeiculo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
