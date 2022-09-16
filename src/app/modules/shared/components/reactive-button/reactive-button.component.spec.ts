import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveButtonComponent } from './reactive-button.component';
import { SharedTestingModule } from '../../shared-testing.module';

describe('ReactiveButtonComponent', () => {
  let component: ReactiveButtonComponent;
  let fixture: ComponentFixture<ReactiveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveButtonComponent],
      imports: [SharedTestingModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReactiveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
