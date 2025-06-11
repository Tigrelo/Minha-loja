import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  veiculos: any[] = [];
  veiculoParaEditar: any = null;

  @ViewChild('veiculoForm') veiculoForm!: NgForm;

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit(): void {
    console.log('Componente iniciado, buscando lista inicial...');
    this.getVeiculos();
  }

  getVeiculos(): void {
    console.log('--- CHAMANDO getVeiculos() ---');
    this.veiculoService.getVeiculos().subscribe(data => {
      console.log('Dados recebidos do backend:', data);
      this.veiculos = data;
      console.log('Array `this.veiculos` foi atualizado. Tamanho atual:', this.veiculos.length);
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    console.log('--- Botão SALVAR clicado ---');
    const veiculoData = form.value;

    if (this.veiculoParaEditar) {
      console.log('Modo EDIÇÃO detectado. ID:', this.veiculoParaEditar.id);
      this.veiculoService.atualizarVeiculo(this.veiculoParaEditar.id, veiculoData).subscribe(() => {
        console.log('Veículo atualizado no backend. Recarregando a lista...');
        this.getVeiculos();
        this.cancelarEdicao();
      });
    } else {
      console.log('Modo CRIAÇÃO detectado.');
      this.veiculoService.salvarVeiculo(veiculoData).subscribe(() => {
        console.log('Veículo salvo no backend. Recarregando a lista...');
        this.getVeiculos(); // A única ação para atualizar a lista
        form.reset();
      });
    }
  }

  iniciarEdicao(veiculo: any): void {
    console.log('--- Botão EDITAR clicado ---', veiculo);
    this.veiculoParaEditar = veiculo;
    this.veiculoForm.setValue({
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      preco: veiculo.preco
    });
  }

  deletar(id: number): void {
    console.log('--- Botão DELETAR clicado --- ID:', id);
    if (confirm('Tem certeza que deseja deletar este veículo?')) {
      this.veiculoService.deletarVeiculo(id).subscribe(() => {
        console.log('Veículo deletado no backend. Removendo da lista local...');
        this.veiculos = this.veiculos.filter(v => v.id !== id);
      });
    }
  }

  cancelarEdicao(): void {
    console.log('--- Edição cancelada ---');
    this.veiculoParaEditar = null;
    this.veiculoForm.reset();
  }
}
