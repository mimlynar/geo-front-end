import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarTaskComponent } from './polar-task.component';

describe('PolarTaskComponent', () => {
  let component: PolarTaskComponent;
  let fixture: ComponentFixture<PolarTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolarTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
