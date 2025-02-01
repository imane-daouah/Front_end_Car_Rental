import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { ChartType, ChartData ,ChartTypeRegistry, Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pourcentage-reservations',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './pourcentage-reservations.component.html',
  styleUrl: './pourcentage-reservations.component.scss'
})
export class PourcentageReservationsComponent implements OnInit{
 public pieChartLabels: string[] = [];
  public chart: Chart | undefined;
  public pieChartData: ChartData<'pie'> =  {
    labels: [], // Labels doivent être définis initialement comme un tableau vide
    datasets: [
      {
        data: [], // Initialisez data avec un tableau vide, qui sera rempli après la réponse
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#AA66CC', '#FF6F61'] // Définissez des couleurs d'arrière-plan pour les segments
      }
    ]
  };
  public pieChartType: keyof ChartTypeRegistry = 'pie';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/reports/pourcentage').subscribe((response) => {
      // Mettez à jour les labels et les données du graphique avec la réponse de l'API
      this.pieChartLabels = response.labels;
      this.pieChartData = {
        labels: response.labels,
        datasets: [
          {
            data: response.data, // Assurez-vous que 'response.data' contient les valeurs numériques attendues
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#AA66CC', '#FF6F61'] // Vous pouvez adapter les couleurs selon vos préférences
          }
        ]
      };
    });
  
  }

}
