import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';


import { PourcentageReservationsComponent } from './pourcentage-reservations/pourcentage-reservations.component';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule,FormsModule, NgChartsModule,PourcentageReservationsComponent],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.scss'
})
export class StatistiqueComponent implements OnInit{
  startDate: string = '';
  endDate: string = '';
  reservations: any[] = [];
  factures: any[] = [];
  revenue: number = 0;

  constructor(private reportService: AdminService,private http: HttpClient) { }

  generateReport() {
    this.reportService.getReservations1(this.startDate, this.endDate).subscribe(data => {
      this.reservations = data;
    });

    this.reportService.getFactures(this.startDate, this.endDate).subscribe(data => {
      this.factures = data;
    });

    this.reportService.getRevenue(this.startDate, this.endDate).subscribe(data => {
      this.revenue = data;
    });
    this.reportService.getReports(this.startDate, this.endDate).subscribe(data => {
      this.revenueData = data.revenues;
      this.reservationData = data.reservations;
      console.log('Revenues:', this.revenueData);
      console.log('Reservations:', this.reservationData);

      this.createChart();
      this.createChart1();
    });
  }
 

  public chart: Chart | undefined;
  public revenueData: any = [];
  public reservationData: any = [];
  public chart1: Chart | undefined;
  ngOnInit(): void {
   
  
  }


  // Créer un graphique avec les données
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'bar', // Type de graphique (barres)
      data: {
        labels: this.revenueData.map((item: { amount: number; date: string }) => item.date), // Date des réservations
        datasets: [{
          label: 'Revenue',
          data: this.revenueData.map((item: { amount: number; date: string })  => item.amount), // Montant des revenus
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          label: 'Reservations',
          data: this.reservationData.map((item: { count: number; date: string })  => item.count), // Nombre de réservations
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createChart1() {
    if (this.chart1) {
      this.chart1.destroy();
    }
    this.chart1 = new Chart('canva', {
      type: 'bar', // Type de graphique (barres)
      data: {
        labels: this.reservationData.map((item: { amount: number; date: string }) => item.date), // Date des réservations
        datasets: [{
          label: 'Reservations',
          data: this.reservationData.map((item: { count: number; date: string })  => item.count), // Nombre de réservations
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
   
}
