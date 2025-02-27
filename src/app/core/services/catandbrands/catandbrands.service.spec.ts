import { TestBed } from '@angular/core/testing';

import { CatandbrandsService } from './catandbrands.service';

describe('CatandbrandsService', () => {
  let service: CatandbrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatandbrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
