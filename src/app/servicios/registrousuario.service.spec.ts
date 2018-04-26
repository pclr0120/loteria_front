import { TestBed, inject } from '@angular/core/testing';

import { RegistrousuarioService } from './registrousuario.service';

describe('RegistrousuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrousuarioService]
    });
  });

  it('should be created', inject([RegistrousuarioService], (service: RegistrousuarioService) => {
    expect(service).toBeTruthy();
  }));
});
