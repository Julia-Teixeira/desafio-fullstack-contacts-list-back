import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto) {
    const client = await this.clientRepository.create(createClientDto);
    return client;
  }

  async findOne(id: string) {
    const findClient = await this.clientRepository.findOne(id);
    return findClient;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const updatedClient = await this.clientRepository.update(
      id,
      updateClientDto
    );
    return updatedClient;
  }

  async remove(id: string) {
    return await this.clientRepository.delete(id);
  }
}
