import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VeiculoListComponent } from './components/veiculo-list/veiculo-list.component'; // 1. IMPORTE AQUI

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. ADICIONE O VeiculoListComponent AQUI NO ARRAY DE IMPORTS
  imports: [CommonModule, RouterOutlet, VeiculoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meu-app-frontend';
}
