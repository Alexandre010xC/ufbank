import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';

export abstract class IUsersService {
  abstract create(createUserDto: CreateUserDto): CreateUserDto;
  abstract findAll(): CreateUserDto[];
  abstract findOne(id: number): CreateUserDto | null;
  abstract update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): CreateUserDto | string;
  abstract remove(id: number): string;
}
