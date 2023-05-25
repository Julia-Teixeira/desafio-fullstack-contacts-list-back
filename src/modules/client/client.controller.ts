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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('client')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentClient() client: Client) {
    return await this.clientService.findOne(client.id);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentClient() client: Client,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return await this.clientService.update(client.id, updateClientDto);
  }

  @HttpCode(204)
  @Delete('')
  @UseGuards(JwtAuthGuard)
  async remove(@CurrentClient() client: Client) {
    return await this.clientService.remove(client.id);
  }
}
