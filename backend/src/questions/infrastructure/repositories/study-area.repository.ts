import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { StudyAreaDb } from '../orm-entities/study-area.db-entity';
import { CreateStudyAreaDto } from '../../application/dto/create-study-area.dto';
import { StudyArea } from '../../domain/entities/study-area.entity';

@Injectable()
export class StudyAreaRepository
  extends GenericRepository<StudyAreaDb, StudyArea>
  implements OnModuleInit
{
  constructor(
    @Inject('STUDY_AREA_REPOSITORY')
    private readonly studyAreasRepositoryOrm: Repository<StudyAreaDb>,
  ) {
    super(studyAreasRepositoryOrm, 'StudyArea');
  }

  async findAllWithSubjects() {
    this.logger.log('fetching all with subjects');
    return await this.studyAreasRepositoryOrm.find({ relations: ['subjects'] });
  }

  async onModuleInit(): Promise<void> {
    const users = await this.studyAreasRepositoryOrm.find();
    if (users.length === 0) {
      this.logger.log('study area has been created');
      const adm: CreateStudyAreaDto = {
        name: 'Engenharia Civil',
        about: 'Área especializada na construção civil',
      };
      const normal: CreateStudyAreaDto = {
        name: 'Engenharia de Segurança do Trabalho',
        about:
          'Área especializada na segurança, saúde e qualidade do trabalhador industrial.',
      };
      await this.create(adm);
      await this.create(normal);
      return;
    }
    this.logger.log(
      'Dont need to create default study areas. studyarea.length = ' +
        users.length,
    );
    return;
  }

  async findOneByName(name: string) {
    return await this.studyAreasRepositoryOrm.findOneBy({ name });
  }
}
