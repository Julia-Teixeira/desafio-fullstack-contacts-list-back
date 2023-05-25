import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto) {
    const findClient = await this.clientRepository.findOneByEmail(
      createClientDto.email
    );
    if (findClient) {
      throw new ConflictException('Cliente já existe!');
    }
    const client = await this.clientRepository.create(createClientDto);
    return client;
  }

  async findOne(id: string) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return findClient;
  }

  async findOneByEmail(email: string) {
    const findClient = await this.clientRepository.findOneByEmail(email);
    if (findClient) {
      throw new ConflictException('Cliente já existe!');
    }
    return findClient;
  }

  async findByEmail(email: string) {
    const findClient = await this.clientRepository.findOneByEmail(email);
    if (findClient) {
      return findClient;
    }
    return null;
  }
  async update(id: string, updateClientDto: UpdateClientDto) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const updatedClient = await this.clientRepository.update(
      id,
      updateClientDto
    );
    return updatedClient;
  }

  async remove(id: string) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return await this.clientRepository.delete(id);
  }
}
