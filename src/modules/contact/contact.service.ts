import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repositories/contact.repository';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  async create(id: string, createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create(id, createContactDto);
    return contact;
  }

  async findAll() {
    return await this.contactRepository.findAll();
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    return findContact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const updatedContact = await this.contactRepository.update(
      id,
      updateContactDto
    );
    return updatedContact;
  }

  async remove(id: string) {
    return await this.contactRepository.delete(id);
  }
}
