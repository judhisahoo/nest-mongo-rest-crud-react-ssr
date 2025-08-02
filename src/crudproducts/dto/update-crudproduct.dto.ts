// src/products/dto/update-crudproduct.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCrudproductDto } from './create-crudproduct.dto';

export class UpdateCrudproductDto extends PartialType(CreateCrudproductDto) {}
