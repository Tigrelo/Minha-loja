import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  cliente: any = {};
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clienteService.getClienteById(+id).subscribe(data => {
        this.cliente = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.clienteService.atualizarCliente(this.cliente.id, this.cliente).subscribe(() => {
        this.voltarParaLista();
      });
    } else {
      this.clienteService.salvarCliente(this.cliente).subscribe(() => {
        this.voltarParaLista();
      });
    }
  }

  voltarParaLista(): void {
    this.router.navigate(['/clientes']);
  }
}
