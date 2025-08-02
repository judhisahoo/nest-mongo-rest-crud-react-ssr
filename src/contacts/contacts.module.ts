import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, contactSchema } from './schemas/Contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: contactSchema }]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
