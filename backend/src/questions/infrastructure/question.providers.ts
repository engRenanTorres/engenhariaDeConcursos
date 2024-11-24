import { DataSource } from 'typeorm';
import { Question } from '../infrastructure/orm-entities/question.db-entity';
import { Subject } from '../infrastructure/orm-entities/subject.db-entity';
import { StudyArea } from '../infrastructure/orm-entities/study-area.db-entity';
import { Level } from '../infrastructure/orm-entities/level.db-entity';
import { InstituteORM } from '../infrastructure/orm-entities/institute.db-entity';
import { Concurso } from '../infrastructure/orm-entities/concurso.db-entity';

export const questionProviders = [
  {
    provide: 'QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Question),
    inject: ['DATA_SOURCE'],
  },
];

export const subjectProviders = [
  {
    provide: 'SUBJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subject),
    inject: ['DATA_SOURCE'],
  },
];

export const studyAreaProviders = [
  {
    provide: 'STUDY_AREA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudyArea),
    inject: ['DATA_SOURCE'],
  },
];

export const levelProviders = [
  {
    provide: 'LEVEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Level),
    inject: ['DATA_SOURCE'],
  },
];

export const instituteProviders = [
  {
    provide: 'INSTITUTE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstituteORM),
    inject: ['DATA_SOURCE'],
  },
];

export const concursoProviders = [
  {
    provide: 'CONCURSO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Concurso),
    inject: ['DATA_SOURCE'],
  },
];
