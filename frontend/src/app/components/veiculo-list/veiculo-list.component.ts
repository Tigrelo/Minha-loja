import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';
import { RouterLink } from '@angular/router'; // Importe o RouterLink

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Adicione o RouterLink aqui
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
// GARANTA QUE 'export' ESTEJA AQUI
export class VeiculoListComponent implements OnInit {
  veiculos: any[] = [];

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit(): void {
    this.getVeiculos();
  }

  getVeiculos(): void {
    this.veiculoService.getVeiculos().subscribe(data => {
      this.veiculos = data;
    });
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar este veículo?')) {
      this.veiculoService.deletarVeiculo(id).subscribe(() => {
        this.veiculos = this.veiculos.filter(v => v.id !== id);
      });
    }
  }
}
