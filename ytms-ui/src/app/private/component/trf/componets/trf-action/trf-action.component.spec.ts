import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrfActionComponent } from './trf-action.component';

describe('TrfActionComponent', () => {
  let component: TrfActionComponent;
  let fixture: ComponentFixture<TrfActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrfActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrfActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
