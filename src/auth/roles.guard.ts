import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/users/domain/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // 2. O Segurança pega o usuário que está tentando entrar
    // OBS: Aqui assumimos que você já tem um sistema de Login/Auth que coloca o user no request
    // (Geralmente feito via JWT Token, explicarei abaixo)
    const { user } = context.switchToHttp().getRequest();

    // Se não tem usuário logado, barra
    if (!user) {
        throw new ForbiddenException('Você precisa estar logado.');
    }

    // 3. Verifica se o papel do usuário bate com o exigido
    const temPermissao = requiredRoles.some((role) => user.role === role);

    if (!temPermissao) {
        throw new ForbiddenException('Acesso negado: Somente ADMIN pode fazer isso.');
    }

    return true;
  }
}