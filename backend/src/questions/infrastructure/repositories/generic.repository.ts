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

  private logger: Logger = new Logger(`${this.entityName}Repository`);

  async create(createDto: DeepPartial<T>): Promise<E> {
    const entity = this.repositoryOrm.create(createDto as T);
    const result = await this.repositoryOrm.save(entity);
    return this.parseToDomainEntity<E>(result);
  }

  async findAll(): Promise<E[]> {
    const all = await this.repositoryOrm.find();
    const allEntities = all.map(e => this.parseToDomainEntity<E>(e));
    return allEntities;
  }

  async findById(id: number): Promise<E> {
    const entity = await this.repositoryOrm.findOne({
      where: [{ id } as FindOptionsWhere<T>],
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
    return this.repositoryOrm.save(entity);
  }

  async remove(id: number) {
    const entity = await this.repositoryOrm.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    this.checkIfExist(entity, id);
    return this.repositoryOrm.remove(entity);
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
