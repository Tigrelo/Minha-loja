import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'http://localhost:8080/api/vendas';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:12345'),
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }

  getVendas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  salvarVenda(venda: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venda, { headers: this.getHeaders() });
  }


  atualizarVenda(id: number, venda: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, venda, { headers: this.getHeaders() });
  }

  deletarVenda(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
