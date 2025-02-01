import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject = new BehaviorSubject<boolean>(false); // Définir l'état initial à "false"
  scrollDirection$ = this.scrollSubject.asObservable();

  constructor() {}

  // Méthode pour définir l'état du défilement (quand le header doit être caché)
  setScrollDirection(isHidden: boolean): void {
    this.scrollSubject.next(isHidden);
  }
}
