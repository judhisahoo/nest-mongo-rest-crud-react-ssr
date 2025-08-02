// src/crudproducts/dto/create-crudproduct.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCrudproductDto {
  @ApiProperty({ example: 'Smartphone' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A powerful new smartphone with a great camera.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 699.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: '12' })
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty({ example: 'A powerful new smartphone with a great camera.' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: '12345ADE456' })
  @IsString()
  @IsNotEmpty()
  upc: string;

  @ApiProperty({ example: 'electronics' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
