import { TestBed } from '@angular/core/testing';

import { PesslInstrumentsDataService } from './pessl-instruments-data.service';

describe('PesslInstrumentsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesslInstrumentsDataService = TestBed.get(PesslInstrumentsDataService);
    expect(service).toBeTruthy();
  });
});
