import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetourComponent } from './add-retour.component';

describe('AddRetourComponent', () => {
  let component: AddRetourComponent;
  let fixture: ComponentFixture<AddRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRetourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
