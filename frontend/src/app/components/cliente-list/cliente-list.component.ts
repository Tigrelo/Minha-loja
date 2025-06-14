import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];

  clienteSelecionado: any = null;
  vendasDoCliente: any[] = [];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((data: any[]) => {
      this.clientes = data;

      // ADICIONE ESTE BLOCO PARA VERIFICAR OS DADOS
      if (data && data.length > 0) {
        console.log('Inspecionando os dados do primeiro cliente:', data[0]);
      }
    });
  }

  // --- MÉTODO CORRIGIDO COM TRATAMENTO DE ERRO ---
  verVendas(cliente: any): void {
    if (this.clienteSelecionado && this.clienteSelecionado.id === cliente.id) {
      this.clienteSelecionado = null;
      this.vendasDoCliente = [];
    } else {
      this.clienteSelecionado = cliente;

      this.clienteService.getVendasDoCliente(cliente.id).subscribe({
        // Bloco 'next' é executado em caso de SUCESSO
        next: (data: any[]) => {
          this.vendasDoCliente = data;
        },
        // Bloco 'error' é executado em caso de FALHA
        error: (err) => {
          console.error('ERRO ao buscar vendas do cliente:', err);
          alert('Ocorreu um erro ao buscar os veículos deste cliente. Verifique o console (F12) para mais detalhes.');

          // Limpa a seleção em caso de erro para não manter a tela em um estado inconsistente
          this.clienteSelecionado = null;
          this.vendasDoCliente = [];
        }
      });
    }
  }
  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.clienteService.deletarCliente(id).subscribe({
        // O que fazer em caso de SUCESSO
        next: () => {
          this.clientes = this.clientes.filter(c => c.id !== id);
          alert('Cliente deletado com sucesso!'); // Feedback de sucesso
        },
        // O que fazer em caso de FALHA
        error: (err) => {
          console.error('Erro ao deletar cliente:', err);
          alert('Não foi possível deletar o cliente.'); // Feedback de erro
        }
      });
    }
  }
}
