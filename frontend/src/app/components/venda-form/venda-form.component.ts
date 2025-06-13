import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { VendaService } from '../../services/venda.service';
import { ClienteService } from '../../services/cliente.service';
import { VeiculoService } from '../../services/veiculo.service';
import { VendedorService } from '../../services/vendedor.service';

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {
  venda: any = { cliente: {id: null}, veiculo: {id: null}, vendedor: {id: null} };

  clientes: any[] = [];
  veiculos: any[] = [];
  vendedores: any[] = [];

  constructor(
    private router: Router,
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private vendedorService: VendedorService
  ) {}

  ngOnInit(): void {
    this.carregarDadosParaFormulario();
  }

  carregarDadosParaFormulario(): void {
    // CORREÇÃO: Adicionamos (data: any[]) para especificar o tipo
    this.clienteService.getClientes().subscribe((data: any[]) => this.clientes = data);
    this.veiculoService.getVeiculos().subscribe((data: any[]) => this.veiculos = data);
    this.vendedorService.getVendedores().subscribe((data: any[]) => this.vendedores = data);
  }

  onSubmit(): void {
    const vendaParaSalvar = {
      cliente: { id: this.venda.cliente.id },
      veiculo: { id: this.venda.veiculo.id },
      vendedor: { id: this.venda.vendedor.id },
      dataVenda: new Date().toISOString().split('T')[0],
      valorTotal: this.venda.valorTotal
    };

    // CORREÇÃO: Adicionamos o tratamento de erro aqui também, por segurança
    this.vendaService.salvarVenda(vendaParaSalvar).subscribe({
      next: () => {
        alert('Venda cadastrada com sucesso!');
        this.router.navigate(['/vendas']);
      },
      error: (err) => {
        console.error('Erro ao salvar venda', err);
        alert('Não foi possível cadastrar a venda.');
      }
    });
  }
}
