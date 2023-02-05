import { Test, TestingModule } from '@nestjs/testing';
import { BloodSamplesController } from './blood_samples.controller';

describe('BloodSamplesController', () => {
  let controller: BloodSamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodSamplesController],
    }).compile();

    controller = module.get<BloodSamplesController>(BloodSamplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
