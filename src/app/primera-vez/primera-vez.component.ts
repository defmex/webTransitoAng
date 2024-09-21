import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import fs from 'fs';
import ReservaPrimeraVez from './todos.json';
import { validateRut } from '@fdograph/rut-utilities';

interface PrimeraReserva {  
  Rut: String;
  Nombres: String;  
  Apellidos: String; 
  FechaNacimiento: String; 
  Status: String;  

}  
@Component({
  selector: 'app-primera-vez',
  standalone: true,
  imports: [NgFor],
  templateUrl: './primera-vez.component.html',
  styleUrl: './primera-vez.component.css'
})
export class PrimeraVezComponent {
  ReservaItems:PrimeraReserva[]=ReservaPrimeraVez;
        
  constructor() { }
  ngOnInit() {
  }

  calculateAge(birthday: string): number {
    const [year, month, day] = birthday.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } 

  myFunc() {

    var rut = ((document.getElementById("rut") as HTMLInputElement).value);
    var nombres = ((document.getElementById("nombres") as HTMLInputElement).value);
    var apellidos = ((document.getElementById("apellidos") as HTMLInputElement).value);
    var fechaNacimiento = ((document.getElementById("fechaDeNacimiento") as HTMLInputElement).value);
    


    if (!validateRut(rut)) {
      alert("Rut no válido");
      return;
    }
    
    if (this.calculateAge(fechaNacimiento) < 18) {
      alert("Debes ser mayor de edad para reservar");
      return;
    }

    const newItem: PrimeraReserva = { Rut:rut, Nombres:nombres, Apellidos:apellidos, FechaNacimiento:fechaNacimiento, Status:"In Progress"  };
    this.ReservaItems.push(newItem);
    var jsonTodoItems=JSON.stringify(this.ReservaItems);
    alert(jsonTodoItems);

    fs.writeFile('src/app/primera-vez/todos.json', jsonTodoItems, (err) => {
      if (err) {
          console.log('Error writing file:', err);
      } else {
          console.log('Successfully wrote file');
      }
      });
  } 
}
