import { Inject, Injectable } from '@nestjs/common';
import { InstituteDb } from '../orm-entities/institute.db-entity';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { Institute } from '../../domain/entities/institute.entity';
import { InstituteRepositoryInterface } from '../../application/repositories/institute-interface.repository';

@Injectable()
export class InstituteRepository
  extends GenericRepository<InstituteDb, Institute>
  implements InstituteRepositoryInterface
{
  constructor(
    @Inject('INSTITUTE_REPOSITORY')
    private readonly instituteRepositoryOrm: Repository<InstituteDb>,
  ) {
    super(instituteRepositoryOrm, 'Institute');
  }
}
