import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-add-retour-retared',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-retour-retared.component.html',
  styleUrl: './add-retour-retared.component.scss'
})
export class AddRetourRetaredComponent {
   @Input() contrat: any;  // Déclarez la variable pour recevoir les données
  carForm: FormGroup;
 @Output() carAdded = new EventEmitter<void>();
  constructor(private fb: FormBuilder,private adminService: AdminService) {
    this.carForm = this.fb.group({
      etat: [true, Validators.required], // État de la voiture
      montant: [null], // Montant des réparations
      description: [''], // Description des dommages
      montantRetard: [null, Validators.required] // Montant par jour de retard
    });
  }

  onSubmit(): void {
    const formValues = this.carForm.value;
    
  const contrat = this.contrat;  // Remplissez ceci avec le contrat que vous avez sélectionné

  if (formValues.etat === false) {
    // Si l'état est "endommagé", envoyer aussi le montant
    this.adminService.ajouterRetour(contrat.idContrat, formValues.etat).subscribe(response => {
      console.log('Retour ajouté :', response);
  
      // Créer la facture supplémentaire
      this.adminService.createFacture(contrat, formValues.montantRetard,formValues.montant,formValues.description).subscribe(factureResponse => {
        console.log('Facture créée :', factureResponse);
        this.downloadFacture(factureResponse.id_facture); // Assurez-vous que cette méthode fonctionne correctement pour télécharger la facture
        this.carAdded.emit();  // Émettre l'événement que la voiture a été ajoutée
      }, error => {
        console.error('Erreur lors de la création de la facture :', error);
      });
    }, error => {
      console.error('Erreur lors de l\'ajout du retour :', error);
    });
  } else {
    // Si l'état est "en bon état", envoyer uniquement l'état
    this.adminService.ajouterRetour(contrat.idContrat, formValues.etat).subscribe(response => {
      console.log('Retour ajouté :', response);
      this.adminService.createFacture(contrat, formValues.montantRetard,0,formValues.description).subscribe(factureResponse => {
        console.log('Facture créée :', factureResponse);
        this.downloadFacture(factureResponse.id_facture); // Assurez-vous que cette méthode fonctionne correctement pour télécharger la facture
        this.carAdded.emit();  // Émettre l'événement que la voiture a été ajoutée
      }, error => {
        console.error('Erreur lors de la création de la facture :', error);
      });
      this.carAdded.emit(); // Émettre l'événement que la voiture a été ajoutée
    }, error => {
      console.error('Erreur lors de l\'ajout du retour :', error);
    });
  }
  }
  downloadFacture(id: number): void {
    const url = `http://localhost:8080/api/factures/downloadsup/${id}`;
    window.open(url, '_blank');
  }
  onCancel(): void {
    this.carForm.reset({
      etat: true, // Valeur par défaut
      montant: null,
      description: '',
      montantRetard: null
    });
  }
}
