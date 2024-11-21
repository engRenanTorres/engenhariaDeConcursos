import { DataSource } from 'typeorm';
import { Question } from '../domain/entities/question.entity';
import { Subject } from '../domain/entities/subject.entity';
import { StudyArea } from '../domain/entities/study-area.entity';
import { Level } from '../domain/entities/level.entity';
import { Institute } from '../domain/entities/institute.entity';
import { Concurso } from '../domain/entities/concurso.entity';

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
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Institute),
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
