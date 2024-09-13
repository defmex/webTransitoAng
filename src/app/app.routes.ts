import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PrimeraVezComponent } from './primera-vez/primera-vez.component';
import { RenovarComponent } from './renovar/renovar.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'primeraVez-component', component: PrimeraVezComponent },
    { path: 'renovar-component', component: RenovarComponent },
    { path: 'editarReserva-component', component: EditarReservaComponent }
];
