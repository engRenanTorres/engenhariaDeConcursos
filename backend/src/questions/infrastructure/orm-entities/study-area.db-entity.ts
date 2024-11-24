import { Subject } from './subject.db-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('study-areas')
export class StudyArea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  about: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Subject, subject => subject.area)
  subjects: Subject[];
}
