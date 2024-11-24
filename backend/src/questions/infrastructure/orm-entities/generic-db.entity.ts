import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { GenericEntity } from '../../domain/entities/generic.entity';

export abstract class GenericOrmEntity {
  @Column({ type: 'date', nullable: true, default: null })
  public readonly createdAt?: Date = new Date();
  @PrimaryGeneratedColumn()
  id: number;
  abstract parseToDomainEntity(): GenericEntity;
}
