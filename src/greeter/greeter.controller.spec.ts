import { Test, TestingModule } from '@nestjs/testing';
import { GreeterController } from './greeter.controller';

describe('GreeterController', () => {
  let controller: GreeterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreeterController],
    }).compile();

    controller = module.get<GreeterController>(GreeterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
