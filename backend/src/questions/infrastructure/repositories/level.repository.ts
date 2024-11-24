import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { LevelDbEntity } from '../orm-entities/level.db-entity';
import { Level } from '../../domain/entities/level.entity';

@Injectable()
export class LevelRepository extends GenericRepository<LevelDbEntity, Level> {
  constructor(
    @Inject('LEVEL_REPOSITORY')
    private readonly LevelRepositoryOrm: Repository<LevelDbEntity>,
  ) {
    super(LevelRepositoryOrm, 'Level');
  }

  async onModuleInit(): Promise<void> {
    const levels = await this.LevelRepositoryOrm.find();
    if (levels.length === 0) {
      this.logger.log('default level has been created');
      const level1 = {
        name: 'Superior',
        about: '00000000000',
      };
      const level2 = {
        name: 'Técnico',
        about: '00000000002',
      };
      await this.create(level1);
      await this.create(level2);
      return;
    }
    this.logger.log(
      'Dont need to create default levels. levels.length = ' + levels.length,
    );
    return;
  }
}
