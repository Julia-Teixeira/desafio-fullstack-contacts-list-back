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
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createContactDto: CreateContactDto) {
    return this.contactService.create(id, createContactDto);
  }

  @Get('')
  findAll(@Request() req: Request) {
    console.log(req.headers['authorization']);
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: Request) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
