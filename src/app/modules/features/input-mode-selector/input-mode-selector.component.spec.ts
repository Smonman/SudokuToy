import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputModeSelectorComponent } from './input-mode-selector.component';

describe('InputModeSelectorComponent', () => {
  let component: InputModeSelectorComponent;
  let fixture: ComponentFixture<InputModeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputModeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
