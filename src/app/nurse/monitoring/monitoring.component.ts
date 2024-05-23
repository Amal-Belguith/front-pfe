import { Component } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent {

  // Propriété pour suivre l'état des boutons
  buttonState: string = ''; // initialiser avec une chaîne vide

  constructor() {
    // Constructor code
  }

  // Fonction pour gérer le clic sur le bouton "No"
  onNoButtonClick() {
    this.buttonState = 'btn-danger';
  }

  // Fonction pour gérer le clic sur le bouton "Yes"
  onYesButtonClick() {
    this.buttonState = 'btn-success';
  }
}





