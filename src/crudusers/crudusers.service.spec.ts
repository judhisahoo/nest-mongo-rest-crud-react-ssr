import { Test, TestingModule } from '@nestjs/testing';
import { CrudusersService } from './crudusers.service';

describe('CrudusersService', () => {
  let service: CrudusersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudusersService],
    }).compile();

    service = module.get<CrudusersService>(CrudusersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
