import { TestBed } from '@angular/core/testing';
import { IQaGrid } from '.';

import { QaGlobalsService } from './qa-globals.service';

describe('QaGlobalService', () => {
  let service: QaGlobalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaGlobalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add grids', () => {
    it('should add given grid and gridName property to grids array', () => {
      let gridMock = {} as IQaGrid;

      expect(service.grids['grid']).not.toEqual(gridMock);

      service.addGrid('grid', gridMock);

      expect(service.grids['grid']).toEqual(gridMock);
    })
  })

  describe('removeGrid', () => {
    let gridMock = {} as IQaGrid;
    it('should add given grid and gridName property to grids array', () => {
      service.grids = {grid: gridMock};

      expect(service.grids['grid']).toEqual(gridMock);

      service.removeGrid('grid');

      expect(service.grids['grid']).toEqual(undefined);
    })
  })

});
