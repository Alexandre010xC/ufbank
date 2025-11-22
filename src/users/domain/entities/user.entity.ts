
export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export class User {
  id: number;
  nome: string;
  email: string;
  cpfCnpj: string;
  role: UserRole;
}
