import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:12345'),
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getClienteById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  getVendasDoCliente(idCliente: number): Observable<any[]> {
    const url = `${this.apiUrl}/${idCliente}/vendas`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  salvarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente, { headers: this.getHeaders() });
  }

  atualizarCliente(id: number, cliente: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // A linha que faltava foi adicionada aqui
    return this.http.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  deletarCliente(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
