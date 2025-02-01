
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.scss'
})
export class EditCarComponent {
  car: any = {};

  voitures = [
    {
      id: 1,
      marque: 'Toyota',
      modele: 'Corolla',
      annee: 2020,
      type: 'Berline',
      tarif: 300,
      etat: 'Disponible',
      image: 'path/to/image1.jpg',
      description: 'Voiture en excellent état'
    },
    // ... autres voitures
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.voitures.find((voiture) => voiture.id === id);
  }

  onSubmit(): void {
    // Mettre à jour les informations
    const index = this.voitures.findIndex((voiture) => voiture.id === this.car.id);
    if (index !== -1) {
      this.voitures[index] = { ...this.car };
    }

    // Rediriger vers la liste des voitures
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
