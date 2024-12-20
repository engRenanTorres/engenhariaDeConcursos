import { Question } from './question.entity';
import { StudyArea } from './study-area.entity';
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
  @ManyToOne(() => StudyArea, study => study.subjects, { eager: true })
  area: StudyArea;
  @OneToMany(() => Question, question => question.subject)
  questions: Question[];
}
