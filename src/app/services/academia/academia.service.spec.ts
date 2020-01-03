import { TestBed } from '@angular/core/testing';

import { AcademiaService } from './academia.service';

describe('AcademiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcademiaService = TestBed.get(AcademiaService);
    expect(service).toBeTruthy();
  });
});
