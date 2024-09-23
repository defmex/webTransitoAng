import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PrimeraVezComponent } from './primera-vez/primera-vez.component';
import { RenovarComponent } from './renovar/renovar.component';
import { CancelarCitasComponent } from './cancelar-citas/cancelar-citas.component';
import { ReservaHorasComponent } from './reserva-horas/reserva-horas.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'primeraVez-component', component: PrimeraVezComponent },
    { path: 'renovar-component', component: RenovarComponent },
    { path: 'cancelar-component', component: CancelarCitasComponent },
    { path: 'reservaHoras-component', component: ReservaHorasComponent }
];
