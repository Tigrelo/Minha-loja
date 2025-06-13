import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedorService } from '../../services/vendedor.service';

@Component({
  selector: 'app-vendedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendedor-form.component.html',
  styleUrls: ['./vendedor-form.component.css']
})
export class VendedorFormComponent implements OnInit {
  vendedor: any = {};
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendedorService: VendedorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.vendedorService.getVendedorById(+id).subscribe((data: any) => {
        this.vendedor = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.vendedorService.atualizarVendedor(this.vendedor.id, this.vendedor).subscribe(() => {
        this.voltarParaLista();
      });
    } else {
      this.vendedorService.salvarVendedor(this.vendedor).subscribe(() => {
        this.voltarParaLista();
      });
    }
  }

  voltarParaLista(): void {
    this.router.navigate(['/vendedores']);
  }
}
