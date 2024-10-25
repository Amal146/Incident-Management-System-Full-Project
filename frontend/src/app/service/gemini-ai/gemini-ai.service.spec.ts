import { TestBed } from '@angular/core/testing';

import { GeminiAiService } from './gemini-ai.service';

describe('GeminiAiService', () => {
  let service: GeminiAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
