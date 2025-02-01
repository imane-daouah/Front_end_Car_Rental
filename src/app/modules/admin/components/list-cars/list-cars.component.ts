import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { VoitureModele } from '../../modele/voiture.modele.model';
import { AddCarComponent } from '../add-car/add-car.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-cars',
  standalone: true,
  imports: [CommonModule,AddCarComponent ,FormsModule],
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.scss'
})
export class ListCarsComponent implements OnInit {
  voitures: VoitureModele[] = []; // Liste des voitures
  showAddCarModal: boolean = false; //
  selectedCar: any = null;
  
  isEditing: boolean = false;
  constructor(private voitureService: AdminService) {}

  // Initialisation : Charger les voitures depuis le backend
  ngOnInit(): void {
    this.getVoitures();
  }

  // Méthode pour récupérer les voitures via le service
  getVoitures(): void {
    this.voitureService.getVoitures().subscribe(
      (data: VoitureModele[]) => {
        this.voitures = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des voitures:', error);
      }
    );
  }
  onCarAdded() {
    // Rechargez la liste des voitures (si nécessaire)
    this.getVoitures();

    // Fermez la modale
    this.closeModal();
  }
 
    openModal(): void {
      this.showAddCarModal = true;
    }
  
    closeModal(): void {
      this.showAddCarModal = false;
    }

  // Supprimer une voiture par son ID avec confirmation
deleteCar(id: number): void {
  // Affichage du message de confirmation
  const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?');

  if (confirmation) {
    this.voitureService.deleteVoiture(id).subscribe(
      () => {
        // Mise à jour de la liste des voitures après suppression
        this.voitures = this.voitures.filter(voiture => voiture.id !== id);
        console.log('Voiture supprimée avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la voiture:', error);
      }
    );
  } else {
    console.log('Suppression annulée');
  }
}

// Méthode pour activer le mode édition
editCar(car: any): void {
  this.isEditing = true;
  
  this.selectedCar = { ...car }; // Copier les données de la voiture sélectionnée
}

onSubmitUpdate(): void {
  // Enregistrer les modifications
  this.voitureService.updateVoiture(this.selectedCar).subscribe(
    (response) => {
      // Mise à jour de la liste des voitures après modification
      if (response.id) {
        this.voitures = this.voitures.map(voiture =>
          voiture.id === response.id ? response : voiture
        );
        console.log('Voiture modifiée avec succès');
      }
    },
    (error) => {
      console.error('Erreur lors de la modification de la voiture:', error);
    }
  );
  
  // Sortir du mode édition et réinitialiser la voiture sélectionnée
  this.isEditing = false;
  this.selectedCar = null;
}



// Méthode pour annuler l'édition
cancelEditing(): void {
  this.isEditing = false;
  this.selectedCar = null;
}



}
