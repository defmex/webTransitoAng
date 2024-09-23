import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { User } from '../utils/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


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

export class ReservaCitaComponent implements OnInit {
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  bloques: BloqueHorario[][] = [];
  User: User | undefined;


  selectedHorario: BloqueHorario | null = null;

  constructor(private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
    this.generarBloques();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      console.log('Navigation Object:', navigation); // Log the navigation object
      if (navigation?.extras?.state?.['user']) {
        this.User = navigation.extras.state['user'];
      } else if (isPlatformBrowser(this.platformId)) {
        const state = window.history.state;
        if (state && state.user) {
          this.User = state.user;
        } else {
          console.log('No se ha recibido información del usuario');
        }
      }
    });
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
    if (!this.User) {
      alert('No se ha recibido información del usuario');
      return;
    }

    this.User.BloqueHorario = this.selectedHorario;

    const reserva = {
      ...this.User,
    };

    let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    alert('Reserva realizada con éxito');
  }
}
