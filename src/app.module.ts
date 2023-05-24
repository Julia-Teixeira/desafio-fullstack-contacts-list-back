import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { ContactModule } from './modules/contact/contact.module';
@Module({
  imports: [ClientModule, ContactModule],
})
export class AppModule {}
