import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VeiculoService {
  private apiUrl = 'http://localhost:8080/api/veiculos';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:12345'),
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }

  getVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getVeiculoById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  salvarVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo, { headers: this.getHeaders() });
  }

  atualizarVeiculo(id: number, veiculo: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, veiculo, { headers: this.getHeaders() });
  }

  deletarVeiculo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
