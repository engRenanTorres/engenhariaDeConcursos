import { Column, Entity, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { GenericEntity } from './generic.entity';

@Entity('levels')
export class Level extends GenericEntity {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @OneToMany(() => Question, question => question.level)
  questions: Question[];
}
