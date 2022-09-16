import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuComponent } from './sudoku.component';
import { SharedTestingModule } from '../../../../shared/shared-testing.module';

describe('SudokuComponent', () => {
  let component: SudokuComponent;
  let fixture: ComponentFixture<SudokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuComponent],
      imports: [SharedTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
