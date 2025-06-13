import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// O RouterOutlet e o RouterLink são tudo que você precisa para a navegação
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // A lista de imports fica mais limpa, sem o VeiculoListComponent
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meu-app-frontend';
}
