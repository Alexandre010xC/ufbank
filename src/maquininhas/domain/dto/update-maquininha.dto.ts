import { PartialType } from '@nestjs/mapped-types';
import { CreateMaquininhaDto } from './create-maquininha.dto';
import { IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateMaquininhaDto extends PartialType(CreateMaquininhaDto) {
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'O lucro mensal não pode ser negativo' })
  monthlyProfit?: number;
}
