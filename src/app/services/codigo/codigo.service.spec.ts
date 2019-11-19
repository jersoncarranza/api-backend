import { TestBed } from '@angular/core/testing';

import { CodigoService } from './codigo.service';

describe('CodigoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodigoService = TestBed.get(CodigoService);
    expect(service).toBeTruthy();
  });
});
