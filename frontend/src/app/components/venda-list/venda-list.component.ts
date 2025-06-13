import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VendaService } from '../../services/venda.service';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {
  vendas: any[] = [];

  constructor(private vendaService: VendaService) { }

  ngOnInit(): void {
    this.getVendas();
  }

  getVendas(): void {
    this.vendaService.getVendas().subscribe(data => {
      this.vendas = data;
      console.log('Vendas recebidas:', data); // Para depuração
    });
  }

  // MÉTODO 'deletar' CORRIGIDO E ATIVADO
  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta venda? Esta ação não pode ser desfeita.')) {
      this.vendaService.deletarVenda(id).subscribe({
        next: () => {

          // Remove a venda da lista na tela para uma atualização visual instantânea
          this.vendas = this.vendas.filter(v => v.id !== id);
          alert('Venda deletada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao deletar venda', err);
          alert('Não foi possível deletar a venda.');
        }
      });
    }
  }
}
