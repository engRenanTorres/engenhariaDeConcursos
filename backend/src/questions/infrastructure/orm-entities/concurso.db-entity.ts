import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { InstituteDb } from './institute.db-entity';
import { Question } from './question.db-entity';

@Entity('concurso')
export class Concurso {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @Column({ type: 'int', nullable: true, default: null })
  year: number;
  @ManyToOne(() => InstituteDb, institute => institute.concursos, {
    eager: true,
  })
  institute: InstituteDb;
  @OneToMany(() => Question, question => question.concurso)
  questions: Question[];

  @BeforeInsert()
  maxYear() {
    if (this.year > new Date().getFullYear()) {
      this.year = new Date().getFullYear();
    }
  }
}
