import { Test, TestingModule } from '@nestjs/testing';
import { CrudproductsController } from './crudproducts.controller';

describe('CrudproductsController', () => {
  let controller: CrudproductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudproductsController],
    }).compile();

    controller = module.get<CrudproductsController>(CrudproductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
