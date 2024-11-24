import { Column, Entity, OneToMany } from 'typeorm';
import { Concurso } from './concurso.db-entity';
import { GenericDbEntity } from './generic-db.entity';

@Entity('institute')
export class InstituteDb extends GenericDbEntity {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @Column()
  contact: string;
  @OneToMany(() => Concurso, concurso => concurso.institute)
  concursos: Concurso[];
}
