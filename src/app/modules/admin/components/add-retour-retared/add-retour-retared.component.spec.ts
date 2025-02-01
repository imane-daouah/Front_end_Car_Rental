import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetourRetaredComponent } from './add-retour-retared.component';

describe('AddRetourRetaredComponent', () => {
  let component: AddRetourRetaredComponent;
  let fixture: ComponentFixture<AddRetourRetaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRetourRetaredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRetourRetaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
