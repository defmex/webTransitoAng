import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancelar-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancelar-citas.component.html',
  styleUrls: ['./cancelar-citas.component.css']
})
export class CancelarCitasComponent implements OnInit {
  rut: string = '';
  reservas: any[] = [];
  reservasDelUsuario: any[] = [];
  mensaje: string = '';

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    const reservasGuardadas = localStorage.getItem('reservas');
    if (reservasGuardadas) {
      this.reservas = JSON.parse(reservasGuardadas);
    }
  }

  buscarReservasPorRut() {
    if (this.rut.trim() === '') {
      this.mensaje = 'Ingrese un RUT válido';
      return;
    }
    
    this.reservasDelUsuario = this.reservas.filter(reserva => reserva.rut === this.rut);
    
    if (this.reservasDelUsuario.length === 0) {
      this.mensaje = 'No se encontraron reservas para el RUT ingresado';
    } else {
      this.mensaje = '';
    }
  }

  cancelarReserva(fecha: string, hora: string) {
    const confirmacion = confirm(`¿Está seguro de que desea cancelar la reserva del ${fecha} a las ${hora}?`);
    
    if (confirmacion) {
      this.reservas = this.reservas.filter(reserva => !(reserva.rut === this.rut && reserva.fecha === fecha && reserva.hora === hora));
      this.guardarReservas();
      this.buscarReservasPorRut(); // Actualiza la lista de reservas del usuario
      alert('Reserva cancelada con éxito');
    }
  }

  guardarReservas() {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }
}
