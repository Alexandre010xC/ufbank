import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateMaquininhaDto } from '../domain/dto/create-maquininha.dto';
import { UpdateMaquininhaDto } from '../domain/dto/update-maquininha.dto';
import { Maquininha, MaquininhaStatus } from '../domain/entity/maquininha.entity';
import { MaquininhasRules } from './maquininhas.rules';
// CORREÇÃO AQUI: Mudamos de 'src/...' para o caminho relativo '../../'
import { IUsersService } from '../../users/use-case/iusers.service';
import { UserRole } from '../../users/domain/entities/user.entity';

@Injectable()
export class MaquininhasService {

  private maquininhas: Maquininha[] = [];
  private idCounter = 1;

  constructor(private usersService: IUsersService) {}

  create(dto: CreateMaquininhaDto): Maquininha {

    const existe = this.maquininhas.find(m => m.codigoSerial === dto.codigoSerial);
    if (existe) throw new ConflictException('Já existe uma maquininha com este Serial.');

    if (dto.clienteId) {
      const user = this.usersService.findOne(dto.clienteId);
      if (!user) throw new NotFoundException('Cliente não encontrado.');
      if (user.role === UserRole.ADMIN)
        throw new BadRequestException('Admin não pode ter maquininha.');
    }

    const taxa = MaquininhasRules.calcularTaxa(dto.monthlyProfit);
    const repasse = MaquininhasRules.calcularRepasse(taxa);

    const nova = new Maquininha(
      this.idCounter++,
      dto.modelo,
      dto.status || MaquininhaStatus.ESTOQUE,
      dto.codigoSerial,
      dto.clienteId ?? null,
      dto.monthlyProfit,
      taxa,
      repasse
    );

    this.maquininhas.push(nova);
    return nova;
  }

  findAll(): Maquininha[] {
    return this.maquininhas;
  }

  findOne(id: number): Maquininha {
    const m = this.maquininhas.find(x => x.id === id);
    if (!m) throw new NotFoundException('Maquininha não encontrada.');
    return m;
  }

  update(id: number, dto: UpdateMaquininhaDto): Maquininha {
    const m = this.findOne(id);

    if (dto.modelo) m.modelo = dto.modelo;
    if (dto.status) m.status = dto.status;
    if (dto.clienteId !== undefined) m.clienteId = dto.clienteId;
    if (dto.monthlyProfit !== undefined) {
      m.monthlyProfit = dto.monthlyProfit;

      const taxa = MaquininhasRules.calcularTaxa(m.monthlyProfit);
      m.interestRate = taxa;
      m.repassePercent = MaquininhasRules.calcularRepasse(taxa);
    }

    return m;
  }
}