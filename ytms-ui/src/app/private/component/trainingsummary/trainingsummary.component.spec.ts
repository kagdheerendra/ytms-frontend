import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsummaryComponent } from './trainingsummary.component';

describe('TrainingsummaryComponent', () => {
  let component: TrainingsummaryComponent;
  let fixture: ComponentFixture<TrainingsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
