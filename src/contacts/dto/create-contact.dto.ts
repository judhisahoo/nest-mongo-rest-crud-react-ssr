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

export class CreateContactDto {
  @ApiProperty({ example: 'name is judhisthira sahoo' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50, {
    message: 'username length Must be between 6 and 50 charcters',
  })
  name: string;

  @ApiProperty({ example: 'testuser@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '7008570074' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'enter message' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 500, {
    message: 'username length Must be between 6 and 50 charcters',
  })
  message: string;
}
