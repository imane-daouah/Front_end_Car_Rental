import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPaiementComponent } from './mes-paiement.component';

describe('MesPaiementComponent', () => {
  let component: MesPaiementComponent;
  let fixture: ComponentFixture<MesPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesPaiementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
