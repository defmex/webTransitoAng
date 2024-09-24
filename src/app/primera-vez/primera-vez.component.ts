import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, isPlatformBrowser } from '@angular/common';
import { validateRut } from '@fdograph/rut-utilities';
import { Router } from '@angular/router';
import { goToInicio, goToReserva } from '../utils/utils';
import { User } from '../utils/utils';



@Component({
  selector: 'app-primera-vez',
  standalone: true,
  imports: [NgFor],
  templateUrl: './primera-vez.component.html',
  styleUrls: ['./primera-vez.component.css']
})
export class PrimeraVezComponent {
  ReservaItems: User[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.ReservaItems = this.loadReservaItems();
    }
  }

  calculateAge(dateOfBirth: string): number {
    const [year, month, day] = dateOfBirth.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day); // Months are zero-based in JavaScript
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  myFunc() {
    const rut = ((document.getElementById("rut") as HTMLInputElement).value);
    const nombres = ((document.getElementById("nombres") as HTMLInputElement).value);
    const apellidos = ((document.getElementById("apellidos") as HTMLInputElement).value);
    const fechaNacimiento = ((document.getElementById("fechaDeNacimiento") as HTMLInputElement).value);

    if (!validateRut(rut)) {
      alert("Rut no válido");
      return;
    }

    // Check age using calculateAge
    if (this.calculateAge(fechaNacimiento) < 18) {
      alert("Debes ser mayor de edad para reservar una hora");
      return;
    }

    const newItem: User = {
      Rut: rut,
      Nombres: nombres,
      Apellidos: apellidos,
      FechaNacimiento: fechaNacimiento,
    };

    this.ReservaItems.push(newItem);
    const jsonTodoItems = JSON.stringify(this.ReservaItems);
    alert(jsonTodoItems);

    // Save to local storage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('reservaItems', jsonTodoItems);
    }

    goToReserva(this.router);
  }

  toInicio(){
    goToInicio(this.router);
  }
  loadReservaItems(): User[] {
    if (isPlatformBrowser(this.platformId)) {
      const jsonTodoItems = localStorage.getItem('reservaItems');
      return jsonTodoItems ? JSON.parse(jsonTodoItems) : [];
    }
    return [];
  }
}
