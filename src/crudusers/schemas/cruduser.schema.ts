import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = CrudUser & Document;

@Schema({ timestamps: true })
export class CrudUser {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true, select: false })
  password: string;
}

export const CrudUserSchema = SchemaFactory.createForClass(CrudUser);

// Pre-save hook to hash the password before saving
CrudUserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
