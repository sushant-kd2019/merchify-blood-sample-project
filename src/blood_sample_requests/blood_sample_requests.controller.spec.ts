import { Test, TestingModule } from '@nestjs/testing';
import { BloodSampleRequestsController } from './blood_sample_requests.controller';

describe('BloodSampleRequestsController', () => {
  let controller: BloodSampleRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodSampleRequestsController],
    }).compile();

    controller = module.get<BloodSampleRequestsController>(BloodSampleRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
