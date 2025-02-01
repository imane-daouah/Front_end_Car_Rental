import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ClientModele } from '../../modele/client.modele.model';


@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent implements OnInit {

  clients: ClientModele[] = []; // Tableau des clients de type Client

  constructor(private clientService: AdminService) { }
  

  

  ngOnInit(): void {
    // Appeler le service pour récupérer les clients depuis l'API
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

 

  // Méthode pour modifier un client
  editClient(client: any): void {
    console.log('Modifier le client:', client);
    // Vous pouvez rediriger vers une page de modification ou afficher un formulaire de modification
  }

  // Méthode pour supprimer un client
  deleteClient(clientId: number): void {
  
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce client ?');

    if (confirmation) {
      this.clientService.deleteClient(clientId).subscribe(
        () => {
          // Mise à jour de la liste des voitures après suppression
          this.clients = this.clients.filter(client => client.id !== clientId);
          console.log('Voiture supprimée avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression du client:', error);
        }
      );
    } else {
      console.log('Suppression annulée');
    }
  }
}
