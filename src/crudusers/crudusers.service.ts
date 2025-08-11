import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudUser, UserDocument } from './schemas/cruduser.schema';
import { CreateCruduserDto } from 'src/auth/dto/create-cruduser.dto';
import { UpdateCruduserDto } from 'src/auth/dto/update-cruduser.dto';

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

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    users: CrudUser[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.cruduserModel.find().skip(skip).limit(limit).exec(),
      this.cruduserModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { users, total, currentPage: page, totalPages };
  }

  async update(
    id: string,
    updateCruduserDto: UpdateCruduserDto,
  ): Promise<CrudUser> {
    const updatedUser = await this.cruduserModel.findByIdAndUpdate(
      id,
      updateCruduserDto,
      { new: true },
    );

    // This check handles the case where the user is not found
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return updatedUser;
  }
}
