import { Component } from '@angular/core';
import { appearAnimations } from '../../../animations/appear-animations';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css'],
  animations: [appearAnimations],
})
export class FormErrorComponent {
}
