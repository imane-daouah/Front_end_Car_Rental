import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-add-retour',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-retour.component.html',
  styleUrl: './add-retour.component.scss'
})
export class AddRetourComponent implements OnInit {
  @Input() contrat: any;  // Déclarez la variable pour recevoir les données
  carForm: FormGroup;
  @Output() carAdded = new EventEmitter<void>();

  ngOnInit(): void {
    // Récupérer le contrat des paramètres de la route
    this.carForm = this.fb.group({
      etat: [null, Validators.required],
      montant: [null, []],
      description:[null]
    });
    console.log(this.contrat);
  }
 

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private adminService: AdminService) {
    this.carForm = this.fb.group({
      etat: [null, Validators.required],
      montant: [null, [Validators.min(0), Validators.required]]
    });

    // Mettre le champ "montant" requis uniquement si l'état est "false"
  this.carForm.get('etat')?.valueChanges.subscribe((value) => {
      const montantControl = this.carForm.get('montant');
      if (value === false) {
        montantControl?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        montantControl?.clearValidators();
      }
      montantControl?.updateValueAndValidity();
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
      this.adminService.createFacture(contrat,0, formValues.montant,formValues.description).subscribe(factureResponse => {
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
    this.carForm.reset({ etat: true }); // Réinitialise le formulaire
  }
}
