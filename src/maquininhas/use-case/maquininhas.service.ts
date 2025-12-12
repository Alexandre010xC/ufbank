import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { IMaquininhasService } from './imaquininhas.service';
import { CreateMaquininhaDto } from '../domain/dto/create-maquininha.dto';
import { Maquininha, MaquininhaStatus } from '../domain/entity/maquininha.entity';
import { UserRole } from 'src/users/domain/entities/user.entity';
import { IUsersService } from 'src/users/use-case/iusers.service';

@Injectable()
export class MaquininhasService implements IMaquininhasService {
  
  private maquininhas: Maquininha[] = [];
  private idCounter = 1;
  constructor(private readonly usersService: IUsersService) {}

  create(dto: CreateMaquininhaDto): Maquininha {
    const existeCodigoSerial = this.maquininhas.find(m => m.codigoSerial === dto.codigoSerial);
    if (existeCodigoSerial) {
      throw new ConflictException('Já existe uma maquininha com este Serial Number.');
    }

    if (dto.clienteId) {
      const usuario = this.usersService.findOne(dto.clienteId);

      if (usuario === null) {
         throw new NotFoundException('Cliente não encontrado.');
      }

      if (usuario.role === UserRole.ADMIN) {
        throw new BadRequestException('Não é permitido vincular maquininhas a um Administrador. Vincule apenas a Clientes.');
      }
    }

    const novaMaquininha: Maquininha = {
      id: this.idCounter++,
      codigoSerial: dto.codigoSerial,
      modelo: dto.modelo,
      status: dto.status || MaquininhaStatus.ESTOQUE,
      clienteId: dto.clienteId || undefined,
    };

    this.maquininhas.push(novaMaquininha);
    return novaMaquininha;
  }

  findAll(): Maquininha[] {
    return this.maquininhas;
  }

  findOne(id: number): Maquininha {
    const maq = this.maquininhas.find(m => m.id === id);
    if (!maq) {
      throw new NotFoundException('Maquininha não encontrada.');
    }
    return maq;
  }
}