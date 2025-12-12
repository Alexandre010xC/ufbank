import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { MaquininhaStatus } from '../entity/maquininha.entity';

export class CreateMaquininhaDto {
  @IsString()
  @IsNotEmpty({ message: 'O código serial é obrigatório' })
  codigoSerial: string;

  @IsString()
  @IsNotEmpty({ message: 'O modelo da máquina é obrigatório' })
  modelo: string;

  @IsEnum(MaquininhaStatus)
  @IsOptional()
  status?: MaquininhaStatus;

  @IsNumber()
  @IsOptional()
  clienteId?: number;

  @IsNumber()
  @Min(0, { message: 'O lucro mensal não pode ser negativo' })
  monthlyProfit: number;
}
