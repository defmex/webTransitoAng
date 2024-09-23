import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCitaComponent } from './reserva-cita.component';

describe('ReservaCitaComponent', () => {
  let component: ReservaCitaComponent;
  let fixture: ComponentFixture<ReservaCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
