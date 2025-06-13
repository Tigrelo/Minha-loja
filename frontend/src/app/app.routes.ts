import { Routes } from '@angular/router';
import { VeiculoListComponent } from './components/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './components/veiculo-form/veiculo-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

// 1. NOVOS COMPONENTES
import { VendedorListComponent } from './components/vendedor-list/vendedor-list.component';
import { VendedorFormComponent } from './components/vendedor-form/vendedor-form.component';
import { VendaListComponent } from './components/venda-list/venda-list.component';
import { VendaFormComponent } from './components/venda-form/venda-form.component';


export const routes: Routes = [
  // Rotas de Veículos
  { path: 'veiculos', component: VeiculoListComponent },
  { path: 'veiculos/novo', component: VeiculoFormComponent },
  { path: 'veiculos/editar/:id', component: VeiculoFormComponent },

  // Rotas de Clientes
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },

  // --- 2. ADICIONE AS NOVAS ROTAS AQUI ---

  // Rotas de Vendedores
  { path: 'vendedores', component: VendedorListComponent },
  { path: 'vendedores/novo', component: VendedorFormComponent },
  { path: 'vendedores/editar/:id', component: VendedorFormComponent },

  // Rotas de Vendas
  { path: 'vendas', component: VendaListComponent },
  { path: 'vendas/novo', component: VendaFormComponent },
  // A edição de venda pode ser mais complexa, então vamos focar na lista e criação por enquanto.

  // Redirecionamento padrão
  { path: '', redirectTo: '/veiculos', pathMatch: 'full' },
  { path: '**', redirectTo: '/veiculos' }
];
