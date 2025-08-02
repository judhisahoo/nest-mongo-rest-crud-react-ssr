import { Test, TestingModule } from '@nestjs/testing';
import { CrudproductsService } from './crudproducts.service';

describe('CrudproductsService', () => {
  let service: CrudproductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudproductsService],
    }).compile();

    service = module.get<CrudproductsService>(CrudproductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
