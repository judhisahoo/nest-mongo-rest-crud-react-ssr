// src/crudproducts/schemas/crudproduct.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CrudUser } from 'src/crudusers/schemas/cruduser.schema';

export type ProductDocument = Crudproduct & Document;

@Schema({ timestamps: true })
export class Crudproduct {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, unique: true })
  upc: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CrudUser' })
  user: CrudUser;

  @Prop({ required: true })
  status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Crudproduct);
