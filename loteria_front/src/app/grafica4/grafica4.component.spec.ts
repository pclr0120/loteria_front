import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Grafica4Component } from './grafica4.component';

describe('Grafica4Component', () => {
  let component: Grafica4Component;
  let fixture: ComponentFixture<Grafica4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Grafica4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Grafica4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
