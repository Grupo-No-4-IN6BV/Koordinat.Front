import { TestBed } from '@angular/core/testing';

import { RestProductService } from './rest-product.service';

describe('RestProductService', () => {
  let service: RestProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
