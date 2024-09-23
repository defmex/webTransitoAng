import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaHorasComponent } from './reserva-horas.component';

describe('ReservaHorasComponent', () => {
  let component: ReservaHorasComponent;
  let fixture: ComponentFixture<ReservaHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaHorasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
