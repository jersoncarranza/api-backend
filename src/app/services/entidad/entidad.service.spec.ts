import { TestBed } from '@angular/core/testing';

import { EntidadService } from './entidad.service';

describe('EntidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntidadService = TestBed.get(EntidadService);
    expect(service).toBeTruthy();
  });
});
