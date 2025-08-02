import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudUser, UserDocument } from './schemas/cruduser.schema';
import { CreateCruduserDto } from 'src/auth/dto/create-cruduser.dto';

@Injectable()
export class CrudusersService {
  constructor(
    @InjectModel(CrudUser.name) private cruduserModel: Model<UserDocument>,
  ) {}

  async create(createCruduserDto: CreateCruduserDto): Promise<CrudUser> {
    const crudcreatedUser = new this.cruduserModel(createCruduserDto);
    return crudcreatedUser.save();
  }

  // FIX: Changed return type to `UserDocument | null` to correctly handle Mongoose's `findOne` return type
  // FIX: Corrected method name from findByEmamil to findByEmail
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.cruduserModel.findOne({ email }).select('+password').exec();
  }
}
