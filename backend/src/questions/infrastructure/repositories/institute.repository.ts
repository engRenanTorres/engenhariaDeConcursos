import { Inject, Injectable } from '@nestjs/common';
import { InstituteDb } from '../orm-entities/institute.db-entity';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { Institute } from '../../domain/entities/institute.entity';

@Injectable()
export class InstituteRepository extends GenericRepository<
  InstituteDb,
  Institute
> {
  constructor(
    @Inject('INSTITUTE_REPOSITORY')
    private readonly instituteRepositoryOrm: Repository<InstituteDb>,
  ) {
    super(instituteRepositoryOrm, 'Institute');
  }
}
