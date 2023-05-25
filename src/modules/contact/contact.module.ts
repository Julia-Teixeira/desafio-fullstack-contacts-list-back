import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepository } from './repositories/contact.repository';
import { ContactPrismaRepository } from './repositories/contact.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ClientRepository } from '../client/repositories/client.repository';
import { ClientPrismaRepository } from '../client/repositories/client.prisma.repository';

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    PrismaService,
    {
      provide: ContactRepository,
      useClass: ContactPrismaRepository,
    },
    {
      provide: ClientRepository,
      useClass: ClientPrismaRepository,
    },
  ],
  exports: [ContactService],
})
export class ContactModule {}
