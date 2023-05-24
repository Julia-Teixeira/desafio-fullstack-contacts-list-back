import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './repositories/client.repository';
import { ClientPrismaRepository } from './repositories/client.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    PrismaService,
    { provide: ClientRepository, useClass: ClientPrismaRepository },
  ],
})
export class ClientModule {}
