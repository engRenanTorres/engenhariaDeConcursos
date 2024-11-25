import { GenericDbEntity } from './generic-db.entity';
import { Subject } from './subject.db-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('study-areas')
export class StudyAreaDb extends GenericDbEntity {
  @Column({ unique: true })
  name: string;
  @Column()
  about: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Subject, subject => subject.area)
  subjects: Subject[];
}
