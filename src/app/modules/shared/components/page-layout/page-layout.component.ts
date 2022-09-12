import { Component, OnInit } from '@angular/core';
import { fixedAppearAnimation } from '../../animations/fixed-appear.animation';
import { appearAnimation } from '../../animations/appear.animation';
import { slideInBottomAnimation } from '../../animations/slide-in-bottom.animation';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css'],
  animations: [fixedAppearAnimation, appearAnimation, slideInBottomAnimation],
})
export class PageLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
