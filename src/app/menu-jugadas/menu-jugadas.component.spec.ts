import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuJugadasComponent } from './menu-jugadas.component';

describe('MenuJugadasComponent', () => {
  let component: MenuJugadasComponent;
  let fixture: ComponentFixture<MenuJugadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuJugadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuJugadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
