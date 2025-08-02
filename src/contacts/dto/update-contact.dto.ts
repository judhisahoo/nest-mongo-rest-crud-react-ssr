import { PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Length,
  IsNumber,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({ example: 'name is judhisthira sahoo' })
  @IsString()
  @IsOptional()
  @Length(5, 50, {
    message: 'username length Must be between 6 and 50 charcters',
  })
  name?: string;

  @ApiProperty({ example: 'testuser@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '7008570074' })
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'enter message' })
  @IsString()
  @IsOptional()
  @Length(5, 500, {
    message: 'username length Must be between 6 and 50 charcters',
  })
  message?: string;
}
