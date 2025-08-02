import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Crudproduct, ProductDocument } from './schemas/crudproduct.schema';
import { Model } from 'mongoose';
import { CreateCrudproductDto } from './dto/create-crudproduct.dto';
import { UpdateCrudproductDto } from './dto/update-crudproduct.dto';

@Injectable()
export class CrudproductsService {
  constructor(
    @InjectModel(Crudproduct.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createCrudProductDto: CreateCrudproductDto,
    user: any,
  ): Promise<Crudproduct> {
    const productImage = `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`;
    const createCrudproduct = new this.productModel({
      ...createCrudProductDto,
      user: user.userId,
      image: productImage,
    });
    return createCrudproduct.save();
  }

  async findAll(): Promise<Crudproduct[]> {
    return this.productModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Crudproduct | null> {
    const product = await this.productModel
      .findById(id)
      .populate('user')
      .exec();

    if (!product) {
      // FIX: Throw a NotFoundException instead of returning an HttpException
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateCrudproductDto,
    user: any,
  ): Promise<Crudproduct | null> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async remove(id: string, user: any): Promise<any> {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
