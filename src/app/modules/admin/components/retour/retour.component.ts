import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { AddRetourComponent } from '../add-retour/add-retour.component';
import { AddRetourRetaredComponent } from '../add-retour-retared/add-retour-retared.component';
@Component({
  selector: 'app-retour',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    AddRetourComponent,
    AddRetourRetaredComponent,
   ],
  templateUrl: './retour.component.html',
  styleUrl: './retour.component.scss'
})
export class RetourComponent implements OnInit {
  currentSection: string = 'list'; // Section visible par défaut
  constructor(private retourService: AdminService,private router: Router ) {}
  retours: any[] = []; 
  contrats: any[] = []; 
  contratSelected: any;
  ngOnInit(): void {
    this.retourService.getRetours().subscribe((data) => {
      this.retours = data;
      console.log(data);
    });
    this.retourService.getContrts().subscribe((data) => {
      this.contrats = data;
      console.log(data);
    });
  }

  onCarAdded() {
    // Rechargez la liste des voitures (si nécessaire)
    this.ngOnInit();

    // Fermez la modale
   
  }
  displayedColumns: string[] = ['Client', 'Voiture', 'date Retour', 'Etat Voiture'];

  

  displayedColumnsReservation: string[] = ['Client', 'Voiture', 'Date fin', 'Statu','Action'];

  // Fonction pour changer la section visible
  showSection(section: string) {
    this.currentSection = section;
  }
  retournerVoiture(contrat: any): void {
    this.contratSelected = contrat; 
    this.showSection('add-retour');
    console.log(`Retour de la voiture pour le contrat : `, contrat);
    
    
  }

  retournerVoiture1(contrat: any): void {
    this.contratSelected = contrat; 
    this.showSection('add-retour1');
    console.log(`Retour de la voiture pour le contrat : `, contrat);
    
    
  }
}
