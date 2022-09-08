import { Component, OnInit } from '@angular/core';
import { fixedAppearAnimations } from '../../animations/fixed-appear-animations';
import { appearAnimations } from '../../animations/appear-animations';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css'],
  animations: [fixedAppearAnimations, appearAnimations],
})
export class PageLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
