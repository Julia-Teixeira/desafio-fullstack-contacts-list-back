import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString({ message: 'Deve ser um string' })
  @IsNotEmpty({ message: 'O campo full_name não pode estar vazio.' })
  @ApiProperty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  @ApiProperty()
  email: string;

  @IsString({
    message: 'O campo phone deve ser um string no formato "(00) 0 0000-0000"',
  })
  @IsNotEmpty({ message: 'O campo phone não pode estar vazio.' })
  @ApiProperty()
  phone: string;
}
