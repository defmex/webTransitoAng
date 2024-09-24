import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, isPlatformBrowser } from '@angular/common';
import { validateRut } from '@fdograph/rut-utilities';
import { goToInicio, goToReserva } from '../utils/utils';
import { Router } from '@angular/router';
import { User } from '../utils/utils';


@Component({
  selector: 'app-renovar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './renovar.component.html',
  styleUrl: './renovar.component.css'
})
export class RenovarComponent {
  RenovarItems: User[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.RenovarItems = this.loadRenovarItems();
    }
  }

  validarFecha(fecha: string): boolean {
    const [year, month, day] = fecha.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    //Si es la misma fecha no es valido
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
      return false;
    }
    return date < today;
  }

  myFunc() {
    const rut = ((document.getElementById("rut") as HTMLInputElement).value);
    const nombres = ((document.getElementById("nombres") as HTMLInputElement).value);
    const apellidos = ((document.getElementById("apellidos") as HTMLInputElement).value);
    const fechaCaducidad = ((document.getElementById("fechaDeCaducidad") as HTMLInputElement).value);

    if (!validateRut(rut)) {
      alert("Rut no válido");
      return;
    }

    if (!this.validarFecha(fechaCaducidad)) {
      alert("La fecha de caducidad debe ser anterior a la fecha actual");
      return;
    }

    const newItem: User = {
      Rut: rut,
      Nombres: nombres,
      Apellidos: apellidos,
      FechaCaducidad: fechaCaducidad
    };

    this.RenovarItems.push(newItem);
    const json = JSON.stringify(this.RenovarItems);
    alert(json);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('RenovarItems', json);
    }

    goToReserva(this.router);
  }
  toInicio(){
    goToInicio(this.router);
  }

  loadRenovarItems(): User[] {
    if (isPlatformBrowser(this.platformId)) {
      const json = localStorage.getItem('RenovarItems');
      return json ? JSON.parse(json) : [];
    }
    return [];
  }

}
