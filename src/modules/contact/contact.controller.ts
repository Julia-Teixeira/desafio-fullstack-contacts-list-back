import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CurrentClient } from '../auth/decorators/current-client.decorator';
import { Client } from '../client/entities/client.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('contact')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('contact')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('')
  create(
    @CurrentClient() client: Client,
    @Body() createContactDto: CreateContactDto
  ) {
    return this.contactService.create(client.id, createContactDto);
  }

  @Get('')
  findAll(@Request() req: Request, @CurrentClient() client: Client) {
    return this.contactService.findAll(client.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentClient() client: Client) {
    return this.contactService.findOne(id, client.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
    @CurrentClient() client: Client
  ) {
    return this.contactService.update(id, updateContactDto, client.id);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentClient() client: Client) {
    return this.contactService.remove(id, client.id);
  }
}
