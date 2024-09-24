import { Router } from '@angular/router';

export function goToReserva(router: Router) {
    router.navigate(['/reservaHoras-component']);
}
export interface User {
    Rut: string;
    Nombres: string;
    Apellidos: string;
    FechaNacimiento?: string;
    FechaCaducidad?: string;
}

export function goToInicio(router: Router){
    router.navigate(["/"]);
}