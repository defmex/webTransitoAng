import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarCitasComponent } from './cancelar-citas.component';

describe('CancelarCitasComponent', () => {
  let component: CancelarCitasComponent;
  let fixture: ComponentFixture<CancelarCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
