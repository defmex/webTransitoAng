import { Component } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { User } from '../utils/utils';


export interface BloqueHorario {
  dia: string;
  hora: string;
  disponible: boolean;
}

@Component({
  selector: 'app-reserva-cita',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './reserva-cita.component.html',
  styleUrl: './reserva-cita.component.css'
})

export class ReservaCitaComponent {
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  bloques: BloqueHorario[][] = [];


  selectedHorario: BloqueHorario | null = null;

  constructor() {
    this.generarBloques();
  }

  generarBloques() {
    const horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00'];

    for (let i = 0; i < horas.length; i++) {
      this.bloques[i] = this.dias.map((dia) => ({
        dia: dia,
        hora: horas[i],
        disponible: true
      }));
    }
  }

  seleccionarHora(horario: BloqueHorario) {
    if(horario.disponible){
      this.selectedHorario = horario;
    } else {
      alert('Horario no disponible');
    }
  }

  confirmarReserva() {
    if (!this.selectedHorario) {
      alert('Debes seleccionar un horario');
      return;
    }
    

    //Hacer que la reserva contenga los datos del usuario (implementar interfaz para guardar los datos del usuario actual)
    const reserva: User = {
      Rut: '12345678-9',
      Nombres: 'Juan',
      Apellidos: 'Pérez',
      FechaNacimiento: '01/01/1990',
      BloqueHorario: this.selectedHorario
    };

    let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    alert('Reserva realizada con éxito');
  }
}
