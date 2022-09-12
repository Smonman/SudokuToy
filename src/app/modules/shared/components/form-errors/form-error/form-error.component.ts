import { Component } from '@angular/core';
import { appearAnimation } from '../../../animations/appear.animation';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css'],
  animations: [appearAnimation],
})
export class FormErrorComponent {
}
