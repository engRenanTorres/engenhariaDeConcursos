import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Concurso } from '../../domain/entities/concurso.entity';
import { CreateConcursoDto } from '../../application/dto/create-concurso.dto';
import { InstituteRepository } from './institute.repository';
import { Institute } from '../../domain/entities/institute.entity';

@Injectable()
export class ConcursoRepository implements OnModuleInit {
  private logger: Logger = new Logger('ConcursoService');
  constructor(
    @Inject('CONCURSO_REPOSITORY')
    private readonly concursoRepository: Repository<Concurso>,
    private readonly institueRepository: InstituteRepository,
  ) {}
  async onModuleInit(): Promise<void> {
    const concurso = await this.concursoRepository.find();
    if (concurso.length === 0) {
      try {
        const institute = await this.institueRepository.findById(1);
        const conc1: CreateConcursoDto = {
          name: 'Petrobras',
          about: 'Top',
          year: 2023,
          institute: institute,
        };
        const conc2: CreateConcursoDto = {
          name: 'Fundação Saúde do Rio de Janeiro',
          about: '00000000002',
          year: 2022,
          institute: institute,
        };

        await this.create(conc1);
        await this.create(conc2);
      } catch (e) {
        this.logger.error('Error to creace default concursos');
      }
      this.logger.log('default concurso has been created');
      return;
    }
    this.logger.log(
      'Dont need to create default concusos: concurso.length = ' +
        concurso.length,
    );
    return;
  }
  async create(createConcursoDto: CreateConcursoDto) {
    const concurso = this.concursoRepository.create(createConcursoDto);
    return await this.concursoRepository.save(concurso);
  }
}
