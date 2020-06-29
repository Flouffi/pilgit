import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EveComponent } from './eve.component';

describe('EveComponent', () => {
  let component: EveComponent;
  let fixture: ComponentFixture<EveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
