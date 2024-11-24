import { hashSync } from 'bcrypt';
import { Role } from './role.enum';
import { Question } from '../../questions/domain/entities/question.entity';

export class User {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  password: string;
  roles: Role;

  insertedQuestions: Question[];
  updatedQuestions: Question[];

  constructor(user: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.roles = user?.roles;
    this.password = user?.password;
  }
}
