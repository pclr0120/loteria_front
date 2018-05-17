import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadasComponent } from './jugadas.component';

describe('JugadasComponent', () => {
  let component: JugadasComponent;
  let fixture: ComponentFixture<JugadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
