import { HttpException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/Contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    const newContact = new this.contactModel(createContactDto);
    return newContact.save();
  }

  findAll() {
    return this.contactModel.find();
  }

  async findOne(id: string) {
    const contact = await this.contactModel.findById(id).exec();
    if (contact) return contact;
    return new HttpException('Contact not found', 404);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactModel.findById(id).exec();
    if (contact)
      return this.contactModel.findByIdAndUpdate(id, updateContactDto);
    return new HttpException('Contact not found', 404);
  }

  async remove(id: string) {
    const contact = await this.contactModel.findById(id).exec();
    if (contact) return this.contactModel.findByIdAndDelete(id);
    return new HttpException('Contact not found', 404);
  }
}
