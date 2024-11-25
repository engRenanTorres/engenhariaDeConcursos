import { GenericEntity } from './generic.entity';
import { Subject } from './subject.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('study-areas')
export class StudyArea extends GenericEntity {
  @Column({ unique: true })
  name: string;
  @Column()
  about: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Subject, subject => subject.area)
  subjects: Subject[];
}
