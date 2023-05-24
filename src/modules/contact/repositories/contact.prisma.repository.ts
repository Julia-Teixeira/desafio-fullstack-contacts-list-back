import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactRepository } from './contact.repository';
import { UpdateContactDto } from '../dto/update-contact.dto';

@Injectable()
export class ContactPrismaRepository implements ContactRepository {
  constructor(private prisma: PrismaService) {}

  async create(id: string, data: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, { ...data });
    const newContact = await this.prisma.contact.create({
      data: { ...contact, client_id: id },
    });
    return newContact;
  }

  async findAll(): Promise<Contact[]> {
    const contacts: Contact[] = await this.prisma.contact.findMany();
    return contacts;
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  }

  async findOneByEmail(email: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { email },
    });
    return contact;
  }

  async findOneByPhone(phone: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { phone },
    });
    return contact;
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });
    return contact;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
