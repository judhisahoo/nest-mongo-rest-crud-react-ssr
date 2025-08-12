import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '123456789' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Enforce a strong password policy here
  @ApiProperty({ example: '1234567890' })
  newPassword: string;
}
