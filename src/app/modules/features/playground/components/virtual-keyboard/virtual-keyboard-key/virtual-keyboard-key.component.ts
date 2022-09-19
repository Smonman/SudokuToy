import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-keyboard-key',
  templateUrl: './virtual-keyboard-key.component.html',
  styleUrls: ['./virtual-keyboard-key.component.scss'],
})
export class VirtualKeyboardKeyComponent implements OnInit {

  @Input() value: number | string = 0;
  @Input() display: 'number' | 'none' = 'number';

  constructor() {
  }

  ngOnInit(): void {
  }

  simulateKeyPress(): void {
    if (this.value) {
      const event = new KeyboardEvent('keyup', {
        'key': String(this.value),
      });
      window.dispatchEvent(event);
    }
  }
}
