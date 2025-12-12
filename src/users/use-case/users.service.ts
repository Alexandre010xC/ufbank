import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { IUsersService } from './iusers.service';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UsersService implements IUsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto) {
    const documentoLimpo = createUserDto.cpfCnpj.replace(/\D/g, '');

    const documentoExiste = this.users.find(
      user => user.cpfCnpj === documentoLimpo
    );
    if (documentoExiste) {
      throw new ConflictException('CPF/CNPJ já cadastrado no sistema.');
    }

    const emailExiste = this.users.find(
        user => user.email === createUserDto.email
    );
    if (emailExiste) {
        throw new ConflictException('E-mail já cadastrado.');
    }

    const newUser: User = {
      id: this.idCounter++,
      ...createUserDto,
      cpfCnpj: documentoLimpo,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findAllByRole(role: User['role']) {
    return this.users.filter((u) => u.role === role);
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index > -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return `User #${id} not found`;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return `User #${id} removed`;
    }
    return `User #${id} not found`;
  }
}
