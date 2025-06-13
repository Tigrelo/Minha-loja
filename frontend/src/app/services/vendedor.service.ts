import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  private apiUrl = 'http://localhost:8080/api/vendedores';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:12345'),
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }

  // --- O MÉTODO QUE ESTAVA FALTANDO ---
  getVendedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getVendedorById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  salvarVendedor(vendedor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vendedor, { headers: this.getHeaders() });
  }

  atualizarVendedor(id: number, vendedor: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, vendedor, { headers: this.getHeaders() });
  }

  deletarVendedor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
