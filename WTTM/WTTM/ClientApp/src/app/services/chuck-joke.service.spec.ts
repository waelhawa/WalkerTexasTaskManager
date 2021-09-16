import { TestBed } from '@angular/core/testing';

import { ChuckJokeService } from './chuck-joke.service';

describe('ChuckJokeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChuckJokeService = TestBed.get(ChuckJokeService);
    expect(service).toBeTruthy();
  });
});
