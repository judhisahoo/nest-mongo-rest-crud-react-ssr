import { Module } from '@nestjs/common';
import { CrudproductsController } from './crudproducts.controller';
import { CrudproductsService } from './crudproducts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Crudproduct } from './schemas/crudproduct.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Crudproduct.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CrudproductsController],
  providers: [CrudproductsService],
})
export class CrudproductsModule {}
