import { Column, Entity, OneToMany } from 'typeorm';
import { Concurso } from './concurso.db-entity';
import { Institute } from '../../domain/entities/institute.entity';
import { GenericOrmEntity } from './generic-db.entity';

@Entity('institute')
export class InstituteORM extends GenericOrmEntity {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @Column()
  contact: string;
  @OneToMany(() => Concurso, concurso => concurso.institute)
  concursos: Concurso[];

  parseToDomainEntity(): Institute {
    return new Institute(
      this.id,
      this.name,
      this.about,
      this.contact,
      this.concursos,
    );
  }
}
