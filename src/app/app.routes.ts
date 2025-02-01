import { Routes } from '@angular/router';
import { AppComponent  } from './app.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import {AboutComponent} from './about/about.component';
import {AdminDashboardComponent} from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import {ClientDashboardComponent} from './modules/client/components/client-dashboard/client-dashboard.component';

import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalConditionsComponent } from './components/rental-conditions/rental-conditions.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListClientsComponent } from './modules/admin/components/list-clients/list-clients.component';
import { ListCarsComponent } from './modules/admin/components/list-cars/list-cars.component';
import { ReservationFormComponent } from './modules/client/components/reservation-form/reservation-form.component';
import { ConfirmationComponent } from './modules/client/components/confirmation/confirmation.component';
import { PaymentComponent } from './modules/client/components/payment/payment.component';
import { AddRetourComponent } from './modules/admin/components/add-retour/add-retour.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [
 // { path: '', redirectTo: '/accueil', pathMatch: 'full' }, 
 { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirection par défaut
  {path:"signup",component: SignupComponent},
  {path:"login",component: LoginComponent},
  {path:"accueil",component:AccueilComponent},
 
  {path: 'about',component: AboutComponent},
  {path:'reservation',component:CarListComponent},
  { path: 'details/:id', component: CarDetailComponent },
  { path: 'conditions', component: RentalConditionsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent ,canActivate: [authGuard],},
  { path: 'client-dashboard', component: ClientDashboardComponent ,canActivate: [authGuard]},
 // { path: 'list-client', component: ListClientsComponent  },
 //  { path: 'list-car', component: ListCarsComponent  },
  { path: 'reservation-form/:id', component: ReservationFormComponent ,canActivate: [authGuard]},
  { path: 'confirmer/:id', component: ConfirmationComponent ,canActivate: [authGuard]},
  { path: 'payment/:id', component: PaymentComponent,canActivate: [authGuard] },
 

];
