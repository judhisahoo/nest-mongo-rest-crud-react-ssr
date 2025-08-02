// src/auth/dto/create-cruduser.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Length,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCruduserDto {
  @ApiProperty({ example: 'judhisthira Sahoo' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50, {
    message: 'username length Must be between 6 and 50 charcters',
  })
  name: string;

  @ApiProperty({ example: 'testuser@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '7008570074' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '45' })
  @IsNumber()
  age: number;

  @ApiProperty({ example: '04-04-1999' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
