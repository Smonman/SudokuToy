import { Component, Input } from '@angular/core';
import { Theme } from '../../enums/theme';

@Component({
  selector: 'app-reactive-button',
  templateUrl: './reactive-button.component.html',
  styleUrls: ['./reactive-button.component.css'],
})
export class ReactiveButtonComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() label: string = '';
  @Input() fullWidth = false;
  @Input() theme: Theme = Theme.primary;
  @Input() type: 'button' | 'submit' = 'button';
}
