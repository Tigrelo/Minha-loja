import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit {
  veiculo: any = {};
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.veiculoService.getVeiculoById(+id).subscribe((data: any) => {
        this.veiculo = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.veiculoService.atualizarVeiculo(this.veiculo.id, this.veiculo).subscribe(() => {
        this.voltarParaLista();
      });
    } else {
      this.veiculoService.salvarVeiculo(this.veiculo).subscribe(() => {
        this.voltarParaLista();
      });
    }
  }

  voltarParaLista(): void {
    this.router.navigate(['/veiculos']);
  }
}
