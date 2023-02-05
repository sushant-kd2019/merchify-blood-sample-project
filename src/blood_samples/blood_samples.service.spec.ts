import { Test, TestingModule } from '@nestjs/testing';
import { BloodSamplesService } from './blood_samples.service';

describe('BloodSamplesService', () => {
  let service: BloodSamplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodSamplesService],
    }).compile();

    service = module.get<BloodSamplesService>(BloodSamplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
