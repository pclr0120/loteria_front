import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevapartidaComponent } from './nuevapartida.component';

describe('NuevapartidaComponent', () => {
  let component: NuevapartidaComponent;
  let fixture: ComponentFixture<NuevapartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevapartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevapartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
