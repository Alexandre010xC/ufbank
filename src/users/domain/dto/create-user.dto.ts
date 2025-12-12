import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome deve ser um texto' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' }) 
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'CPF ou CNPJ é obrigatório' })
  cpfCnpj: string;
  
  @IsEnum(UserRole)
  role: UserRole;
}
