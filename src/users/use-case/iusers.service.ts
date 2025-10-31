import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';

export interface iUsers {
  create(createUserDto: CreateUserDto) : string;
  findAll() : string;
  findOne(id: number) : string;
  update(id: number, updateUserDto: UpdateUserDto) : string;
  remove(id: number) : string;
}      