import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentClient } from '../auth/decorators/current-client.decorator';
import { Client } from './entities/client.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get('')
  async findOne(@CurrentClient() client: Client) {
    return await this.clientService.findOne(client.id);
  }

  @Patch('')
  async update(
    @CurrentClient() client: Client,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return await this.clientService.update(client.id, updateClientDto);
  }

  @HttpCode(204)
  @Delete('')
  async remove(@CurrentClient() client: Client) {
    return await this.clientService.remove(client.id);
  }
}
