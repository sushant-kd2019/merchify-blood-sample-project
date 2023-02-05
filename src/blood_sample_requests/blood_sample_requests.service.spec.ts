import { Test, TestingModule } from '@nestjs/testing';
import { BloodSampleRequestsService } from './blood_sample_requests.service';

describe('BloodSampleRequestsService', () => {
  let service: BloodSampleRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodSampleRequestsService],
    }).compile();

    service = module.get<BloodSampleRequestsService>(BloodSampleRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
