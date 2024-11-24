import { Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { GenericOrmEntity } from '../orm-entities/generic-db.entity';
import { GenericEntity } from '../../domain/entities/generic.entity';

export class GenericEntityRepository<T extends GenericOrmEntity> {
  constructor(
    private readonly repositoryOrm: Repository<T>,
    private readonly entityName: string,
  ) {}

  private logger: Logger = new Logger(`${this.entityName}Repository`);

  async create(createDto: Omit<T, 'id'>): Promise<GenericEntity> {
    const entity = this.repositoryOrm.create(createDto as T);
    const result = await this.repositoryOrm.save(entity);
    return result.parseToDomainEntity();
  }

  async findAll() {
    const all = await this.repositoryOrm.find();
    const allEntities = all.map(e => e.parseToDomainEntity());
    return allEntities;
  }

  async findById(id: number): Promise<GenericEntity> {
    const entity = await this.repositoryOrm.findOne({
      where: [{ id } as FindOptionsWhere<T>],
    });
    this.checkIfExist(entity, id);
    return entity.parseToDomainEntity();
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
}
