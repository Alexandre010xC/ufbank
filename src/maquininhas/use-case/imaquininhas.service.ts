import { CreateMaquininhaDto } from '../domain/dto/create-maquininha.dto';
import { Maquininha } from '../domain/entity/maquininha.entity';

export abstract class IMaquininhasService {
  abstract create(dto: CreateMaquininhaDto): Maquininha;
  abstract findAll(): Maquininha[];
  abstract findOne(id: number): Maquininha;
  // abstract update(...) // Pode adicionar depois
  // abstract remove(...) // Pode adicionar depois
}