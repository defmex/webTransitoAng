import { Router } from '@angular/router';
import { BloqueHorario } from '../reserva-cita/reserva-cita.component';

export function goToReserva(router: Router) {
    router.navigate(['/reservaCita-component']);
}

export interface User {
    Rut: string;
    Nombres: string;
    Apellidos: string;
    FechaNacimiento?: string;
    FechaCaducidad?: string;
    BloqueHorario?: BloqueHorario;
}