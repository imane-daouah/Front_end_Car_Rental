import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourcentageReservationsComponent } from './pourcentage-reservations.component';

describe('PourcentageReservationsComponent', () => {
  let component: PourcentageReservationsComponent;
  let fixture: ComponentFixture<PourcentageReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PourcentageReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourcentageReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
