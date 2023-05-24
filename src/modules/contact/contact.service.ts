import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repositories/contact.repository';
import { ClientRepository } from '../client/repositories/client.repository';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private clientRepository: ClientRepository
  ) {}

  async create(id: string, createContactDto: CreateContactDto) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const findContactEmail = await this.contactRepository.findOneByEmail(
      createContactDto.email
    );
    if (findContactEmail) {
      throw new ConflictException('Contato com este email já cadastrado!');
    }

    const findContactPhone = await this.contactRepository.findOneByPhone(
      createContactDto.phone
    );
    if (findContactPhone) {
      throw new ConflictException('Contato com este telefone já cadastrado!');
    }

    const contact = await this.contactRepository.create(id, createContactDto);
    return contact;
  }

  async findAll() {
    return await this.contactRepository.findAll();
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contato não encontrado');
    }
    return findContact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contato não encontrado');
    }

    const updatedContact = await this.contactRepository.update(
      id,
      updateContactDto
    );
    return updatedContact;
  }

  async remove(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contato não encontrado');
    }

    return await this.contactRepository.delete(id);
  }
}
