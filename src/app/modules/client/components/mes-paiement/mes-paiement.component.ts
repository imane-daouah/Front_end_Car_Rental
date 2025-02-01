import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaiementModele } from '../../../admin/modele/paiement.modele.model';
import { ClientService } from '../../service/client.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-mes-paiement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-paiement.component.html',
  styleUrl: './mes-paiement.component.scss'
})
export class MesPaiementComponent implements OnInit{
    paiements: PaiementModele[] = []; // Liste des paiements
    client : any;
      constructor(private paiementService: ClientService,private authService: AuthService) {}
    
      // Initialisation : Charger les paiements
      ngOnInit(): void {
        this.authService.user$.subscribe((data) => {
          this.client= { ...data }; // Copier les données dans adminInfo
         
        });
        this.getPaiements(this.client.id);
      }
    
      // Récupérer les paiements depuis le service
      getPaiements(id: number): void {
        this.paiementService.getPaiements(id).subscribe(
          (data: PaiementModele[]) => {
            this.paiements = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des paiements:', error);
          }
        );
      }
    
   /*    // Modifier un paiement
      editPayment(paiement: PaiementModele): void {
        console.log('Modification du paiement:', paiement);
        // Logique pour modifier un paiement
      }
    
      // Supprimer un paiement
     deletePayment(id: number): void {
        this.paiementService.deletePaiement(id).subscribe(
          () => {
            this.paiements = this.paiements.filter(p => p.id_facture !== id);
            console.log('Paiement supprimé avec succès');
          },
          (error) => {
            console.error('Erreur lors de la suppression du paiement:', error);
          }
        );
      }*/
    
        // Télécharger la facture
        downloadFacture(id: number): void {
          const url = `http://localhost:8080/api/factures/download/${id}`;
          window.open(url, '_blank');
        }
}
