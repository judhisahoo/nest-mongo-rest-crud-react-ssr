// src/auth/dto/unique-email.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CrudusersService } from '../../crudusers/crudusers.service';

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly crudusersService: CrudusersService) {}

  async validate(email: any, args: ValidationArguments) {
    try {
      // Add null/undefined check
      if (!email) {
        return false;
      }

      // Check if crudusersService is available
      if (!this.crudusersService) {
        console.error('CrudusersService is not available');
        return false;
      }

      const user = await this.crudusersService.findByEmail(email);
      return user === null; // Return true if email is unique (user not found)
    } catch (error) {
      console.error('Error validating unique email:', error);
      return false; // Return false if there's an error
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email "$value" already exists!';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
