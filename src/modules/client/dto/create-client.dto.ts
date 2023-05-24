import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'Deve ser um string' })
  @IsNotEmpty({ message: 'O campo full_name não pode estar vazio.' })
  full_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  email: string;

  @IsString({
    message: 'O campo phone deve ser um string no formato "(00) 0 0000-0000"',
  })
  @IsNotEmpty({ message: 'O campo phone não pode estar vazio.' })
  phone: string;

  @IsString({ message: 'O campo password deve ser um string' })
  @IsNotEmpty({ message: 'O campo password não pode estar vazio.' })
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
