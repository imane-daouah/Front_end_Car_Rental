import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationModele } from '../../../admin/modele/reservation.modele.model';
import { ClientService } from '../../service/client.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mes-reservations',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mes-reservations.component.html',
  styleUrl: './mes-reservations.component.scss'
})
export class MesReservationsComponent implements OnInit {
reservations: ReservationModele[] = []; // Liste des réservations
client : any;
 constructor(private reservationService: ClientService,private authService: AuthService ,private router: Router) {}
 // Initialisation : Charger les réservations
 ngOnInit(): void {
  this.authService.user$.subscribe((data) => {
    this.client= { ...data }; // Copier les données dans adminInfo
   
  });
  this.getReservations(this.client.id);
}
// Récupérer les réservations depuis le service
getReservations(id : number): void {
  this.reservationService.getReservations(id).subscribe(
    (data: ReservationModele[]) => {
      this.reservations = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  );
}

 editReservation(reservation: any): void {
  console.log('Modifier la réservation :', reservation);
  // Ajoutez ici la logique pour éditer la réservation (formulaire, redirection, etc.)
}

confirmReservation(reservationId: number): void {
  this.router.navigate(['/confirmer',reservationId]);
}

cancelReservation(reservationId: number): void {
  this.reservationService.annulerReservation(reservationId).subscribe(
    (response) => {
      console.log('Annuler la réservation avec ID :', reservationId);
    },
    (error) => {
      console.error('Erreur lors de annuler la réservation:', error);
    }
  );
 
  
}

payReservation(reservationId: number): void {
  this.router.navigate(['/payment',reservationId]);
}

viewDispute(reservationId: number): void {
  console.log('Voir le litige pour la réservation avec ID :', reservationId);
  // Ajoutez ici la logique pour afficher les détails du litige
}

isEditing: boolean = false; // Contrôle l'affichage (liste ou formulaire)
selectedReservation: any = null; // Réservation sélectionnée pour modification
newStartDate: Date | null = null; // Nouvelle date de début
newEndDate: Date | null = null; // Nouvelle date de fin

// Sélectionner une réservation pour modification
selectReservation(reservation: any): void {
  this.isEditing = true;
  this.selectedReservation = reservation;
  this.newStartDate = reservation.date_debut;
  this.newEndDate = reservation.date_fin;
}

// Mettre à jour les dates de la réservation
updateReservationDates(id:number): void {
  if (!this.selectedReservation) {
    console.error('Aucune réservation sélectionnée.');
    return;
  }

  // Vérification des dates
  if (this.newStartDate && this.newEndDate && this.newStartDate > this.newEndDate) {
    console.error('La date de début ne peut pas être après la date de fin.');
    return;
  }

  // Mise à jour des dates
  this.selectedReservation.date_debut = this.newStartDate;
  this.selectedReservation.date_fin = this.newEndDate;

 
  this.saveUpdatedReservation(this.selectedReservation);

  // Réinitialiser l'état après la mise à jour
  this.isEditing = false;
  this.selectedReservation = null;
  this.newStartDate = null;
  this.newEndDate = null;
}

// Annuler la modification
cancelEditing(): void {
  this.isEditing = false;
  this.selectedReservation = null;
  this.newStartDate = null;
  this.newEndDate = null;
}

// Simuler l'enregistrement dans le backend
saveUpdatedReservation(reservation: any): void {
  this.reservationService.modifierReservation(reservation).subscribe(
    (response) => {
      console.log('Modification de la réservation avec ID :', response);
    },
    (error) => {
      console.error('Erreur lors de la modification de la réservation:', error);
    }
  );
 
}

}
