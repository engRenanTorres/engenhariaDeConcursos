import { Question } from './question.db-entity';
import { StudyAreaDb } from './study-area.db-entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
  @Column({ type: 'text', nullable: false })
  about: string;
  @ManyToOne(() => StudyAreaDb, study => study.subjects, { eager: true })
  area: StudyAreaDb;
  @OneToMany(() => Question, question => question.subject)
  questions: Question[];
}
