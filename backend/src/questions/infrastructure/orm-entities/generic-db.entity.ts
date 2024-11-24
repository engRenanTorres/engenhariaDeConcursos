import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class GenericDbEntity {
  @Column({ type: 'date', nullable: true, default: null })
  public readonly createdAt?: Date = new Date();
  @PrimaryGeneratedColumn()
  id: number;
}
