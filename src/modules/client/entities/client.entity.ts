import { Exclude } from 'class-transformer';

export class Client {
  readonly id: string;
  full_name: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;
}
