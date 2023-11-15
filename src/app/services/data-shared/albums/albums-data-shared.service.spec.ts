import { TestBed } from '@angular/core/testing';

import { AlbumsDataSharedService } from './albums-data-shared.service';

describe('AlbumsDataSharedService', () => {
  let service: AlbumsDataSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsDataSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
