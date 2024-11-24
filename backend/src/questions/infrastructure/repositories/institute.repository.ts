import { Inject, Injectable } from '@nestjs/common';
import { InstituteORM } from '../orm-entities/institute.db-entity';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { Institute } from '../../domain/entities/institute.entity';

@Injectable()
export class InstituteRepository extends GenericRepository<
  InstituteORM,
  Institute
> {
  constructor(
    @Inject('INSTITUTE_REPOSITORY')
    private readonly instituteRepositoryOrm: Repository<InstituteORM>,
  ) {
    super(instituteRepositoryOrm, 'Institute');
  }
}
