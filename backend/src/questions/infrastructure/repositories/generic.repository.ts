import { Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { GenericDbEntity } from '../orm-entities/generic-db.entity';
import { GenericEntity } from '../../domain/entities/generic.entity';

export class GenericRepository<
  T extends GenericDbEntity,
  E extends GenericEntity,
> {
  constructor(
    private readonly repositoryOrm: Repository<T>,
    private readonly entityName: string,
  ) {}

  protected logger: Logger = new Logger(`${this.entityName}Repository`);

  async create(createDto: DeepPartial<T>): Promise<E> {
    const entity = this.repositoryOrm.create(createDto as T);
    const result = await this.repositoryOrm.save(entity);
    return this.parseToDomainEntity<E>(result);
  }

  async findAll(relations?: string[]): Promise<E[]> {
    const all = await this.repositoryOrm.find({ relations });
    const allEntities = all.map(e => this.parseToDomainEntity<E>(e));
    return allEntities;
  }

  async findById(id: number, relations?: string[]): Promise<E> {
    const entity = await this.repositoryOrm.findOne({
      where: [{ id } as FindOptionsWhere<T>],
      relations,
    });
    this.checkIfExist(entity, id);
    return this.parseToDomainEntity<E>(entity);
  }

  async update(id: number, updateDto: Partial<T>) {
    const entity = await this.repositoryOrm.preload({
      id,
      ...updateDto,
    } as DeepPartial<T>);
    this.checkIfExist(entity, id);
    const updated = this.repositoryOrm.save(entity);
    return this.parseToDomainEntity<E>(updated);
  }

  async remove(id: number): Promise<E> {
    const entity = await this.repositoryOrm.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    this.checkIfExist(entity, id);
    const deleted = this.repositoryOrm.remove(entity);
    return this.parseToDomainEntity(deleted);
  }

  private checkIfExist(entity: T, id: number) {
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found by id ${id}`);
    }
  }

  parseToDomainEntity<E>(dbEntity: object): E {
    return { ...dbEntity } as E;
  }
}
