import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingForm } from './coaching-form';

describe('CoachingForm', () => {
  let component: CoachingForm;
  let fixture: ComponentFixture<CoachingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
