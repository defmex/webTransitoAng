import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva-horas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-horas.component.html',
  styleUrl: './reserva-horas.component.css'
})
export class ReservaHorasComponent {
  rut: string = '';
  nombres: string = '';
  apellidos: string = '';
  reservas: any[] = [];
  fechaSeleccionada: string | null = null;
  bloquesDisponibles: any[] = [];
  bloquesHorarios = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30','14:00'];
  horaSeleccionada: string | null = null;
  jsonReserva: string | null = null;

  // Variable que contiene la fecha actual en formato YYYY-MM-DD
  fechaActual: string = new Date().toISOString().split('T')[0];  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarReservas();
  }

  cargarDatos() {
    const reservaItems = localStorage.getItem('reservaItems');
    if (reservaItems) {
      const lastItem = JSON.parse(reservaItems).pop();
      this.rut = lastItem.Rut;
      this.nombres = lastItem.Nombres;
      this.apellidos = lastItem.Apellidos;
    }
  }

  cargarReservas() {
    const reservasGuardadas = localStorage.getItem('reservas');
    if (reservasGuardadas) {
      this.reservas = JSON.parse(reservasGuardadas);
    }
  }

  guardarReservas() {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }

  onFechaSeleccionada(event: any) {
    this.fechaSeleccionada = event.target.value;
    this.actualizarBloquesDisponibles();
  }

  actualizarBloquesDisponibles() {
    const diaSeleccionado = new Date(this.fechaSeleccionada!).getDay();
    if (diaSeleccionado === 0) {
      this.bloquesDisponibles = [];
      return;
    }

    this.bloquesDisponibles = this.bloquesHorarios.map(hora => ({
      hora: hora,
      disponible: !this.reservas.some(r => r.fecha === this.fechaSeleccionada && r.hora === hora)
    }));
  }

  seleccionarHora(hora: string) {
    this.horaSeleccionada = hora;
  }

  confirmarReserva() {
    if (this.horaSeleccionada && this.fechaSeleccionada) {
      const nuevaReserva = {
        fecha: this.fechaSeleccionada,
        hora: this.horaSeleccionada,
        rut: this.rut,
        nombres: this.nombres,
        apellidos: this.apellidos
      };

      // Agregar la nueva reserva al array de reservas
      this.reservas.push(nuevaReserva);
      this.guardarReservas();

      // Actualizar los bloques disponibles para que la hora confirmada ya no aparezca
      this.bloquesDisponibles = this.bloquesDisponibles.map(bloque => {
        if (bloque.hora === this.horaSeleccionada) {
          return { ...bloque, disponible: false };  // Marcar la hora como no disponible
        }
        return bloque;
      });

      // Mostrar JSON de la reserva confirmada
      this.jsonReserva = JSON.stringify(nuevaReserva, null, 2);
      alert('Reserva confirmada');
      this.router.navigate(['/']); 
    } else {
      alert('Seleccione una fecha y hora');
    }
  }
}
