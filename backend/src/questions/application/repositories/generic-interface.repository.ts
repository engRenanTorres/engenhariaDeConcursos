import { DeepPartial } from 'typeorm';
import { GenericEntity } from '../../domain/entities/generic.entity';

export interface GenericRepositoryInterface<E extends GenericEntity> {
  create(createDto: DeepPartial<E>): Promise<E>;
  findAll(relations?: string[]): Promise<E[]>;
  findById(id: number, relations?: string[]): Promise<E>;

  update(id: number, updateDto: Partial<E>): Promise<E>;

  remove(id: number): Promise<E>;
}
