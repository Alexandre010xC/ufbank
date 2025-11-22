import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { MaquininhaStatus } from '../entity/maquininha.entity';

export class CreateMaquininhaDto {
  @IsString()
  @IsNotEmpty({ message: 'O código serial é obrigatório' })
  codigoSerial: string;

  @IsString()
  @IsNotEmpty({ message: 'O modelo da máquina é obrigatório' })
  modelo: string;

  @IsEnum(MaquininhaStatus)
  @IsOptional() // Se não mandar, assumimos que é ESTOQUE
  status?: MaquininhaStatus;

  @IsNumber()
  @IsOptional() // Pode criar sem dono (para estoque)
  clienteId?: number;
}