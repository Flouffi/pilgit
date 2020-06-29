import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoteurComponent } from './moteur.component';

describe('MoteurComponent', () => {
  let component: MoteurComponent;
  let fixture: ComponentFixture<MoteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
