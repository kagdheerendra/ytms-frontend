import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtrfComponent } from './viewtrf.component';

describe('ViewtrfComponent', () => {
  let component: ViewtrfComponent;
  let fixture: ComponentFixture<ViewtrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtrfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
