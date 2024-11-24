import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InstituteRepository } from './repositories/institute.repository';
import { InstituteDb } from './orm-entities/institute.db-entity';

@Injectable()
export class Seed implements OnModuleInit {
  constructor(private readonly instituteRepository: InstituteRepository) {}

  private logger: Logger = new Logger('InstituteService');

  async onModuleInit(): Promise<void> {
    const institutes = await this.instituteRepository.findAll();
    if (institutes.length === 0) {
      this.logger.log('default institute has been created');
      const banca1 = {
        name: 'FGV',
        about: '00000000000',
        contact: 'adm@adm.com',
        concursos: [],
      } as Omit<InstituteDb, 'id'>;
      const banca2 = {
        name: 'Cesgranrio',
        about: '00000000002',
        contact: 'normal@normal.com',
        concursos: [],
      } as Omit<InstituteDb, 'id'>;
      await this.instituteRepository.create(banca1);
      await this.instituteRepository.create(banca2);
      return;
    }
    this.logger.log(
      'Dont need to institues. Institutes.length = ' + institutes.length,
    );
    return;
  }
}
