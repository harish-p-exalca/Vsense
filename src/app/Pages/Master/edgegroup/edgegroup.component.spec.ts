import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgegroupComponent } from './edgegroup.component';

describe('EdgegroupComponent', () => {
  let component: EdgegroupComponent;
  let fixture: ComponentFixture<EdgegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
