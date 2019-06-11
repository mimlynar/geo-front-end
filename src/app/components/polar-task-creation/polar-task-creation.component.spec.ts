import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarTaskCreationComponent } from './polar-task-creation.component';

describe('PolarTaskCreationComponent', () => {
  let component: PolarTaskCreationComponent;
  let fixture: ComponentFixture<PolarTaskCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolarTaskCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarTaskCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
