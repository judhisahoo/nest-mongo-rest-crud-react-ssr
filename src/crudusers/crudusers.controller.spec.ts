import { Test, TestingModule } from '@nestjs/testing';
import { CrudusersController } from './crudusers.controller';

describe('CrudusersController', () => {
  let controller: CrudusersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudusersController],
    }).compile();

    controller = module.get<CrudusersController>(CrudusersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
