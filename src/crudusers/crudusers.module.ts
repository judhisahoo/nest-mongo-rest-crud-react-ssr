import { Module } from '@nestjs/common';
import { CrudusersController } from './crudusers.controller';
import { CrudusersService } from './crudusers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrudUser, CrudUserSchema } from './schemas/cruduser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CrudUser.name, schema: CrudUserSchema },
    ]),
  ],
  controllers: [CrudusersController],
  providers: [CrudusersService],
  exports: [CrudusersService],
})
export class CrudusersModule {}
