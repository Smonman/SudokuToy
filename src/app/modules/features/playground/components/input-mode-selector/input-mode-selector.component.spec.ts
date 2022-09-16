import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputModeSelectorComponent } from './input-mode-selector.component';
import { SharedTestingModule } from '../../../../shared/shared-testing.module';

describe('InputModeSelectorComponent', () => {
  let component: InputModeSelectorComponent;
  let fixture: ComponentFixture<InputModeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputModeSelectorComponent],
      imports: [SharedTestingModule],
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
