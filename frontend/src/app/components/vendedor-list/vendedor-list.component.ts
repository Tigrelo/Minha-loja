import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VendedorService } from '../../services/vendedor.service';

@Component({
  selector: 'app-vendedor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vendedor-list.component.html',
  styleUrls: ['./vendedor-list.component.css']
})
export class VendedorListComponent implements OnInit {
  vendedores: any[] = [];

  constructor(private vendedorService: VendedorService) { }

  ngOnInit(): void {
    this.getVendedores();
  }

  getVendedores(): void {
    this.vendedorService.getVendedores().subscribe((data: any[]) => {
      this.vendedores = data;
    });
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar este vendedor?')) {
      this.vendedorService.deletarVendedor(id).subscribe(() => {
        this.vendedores = this.vendedores.filter(v => v.id !== id);
      });
    }
  }
}
