import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Grafica5Component } from './grafica5.component';

describe('Grafica5Component', () => {
  let component: Grafica5Component;
  let fixture: ComponentFixture<Grafica5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Grafica5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Grafica5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
