import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControldetailsComponent } from './controldetails.component';

describe('ControldetailsComponent', () => {
  let component: ControldetailsComponent;
  let fixture: ComponentFixture<ControldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
