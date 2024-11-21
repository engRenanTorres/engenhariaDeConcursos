import { Module } from '@nestjs/common';
import { QuestionService } from '../application/services/question.service';
import { QuestionController } from './controllers/question.controller';
import { DatabaseModule } from '../../database/database.module';
import {
  concursoProviders,
  instituteProviders,
  levelProviders,
  questionProviders,
  studyAreaProviders,
  subjectProviders,
} from './question.providers';
import { UsersModule } from '../../users/users.module';
import { SubjectService } from '../application/services/subject.service';
import { SubjectController } from './controllers/subject.controller';
import { StudyAreaService } from '../application/services/study-area.service';
import { StudyAreaController } from './controllers/study-area.controller';
import { LevelService } from '../application/services/level.service';
import { LevelController } from './controllers/level.controller';
import { InstituteService } from '../application/services/institute.service';
import { ConcursoService } from '../application/services/concurso.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [
    QuestionController,
    SubjectController,
    StudyAreaController,
    LevelController,
  ],
  providers: [
    QuestionService,
    ...questionProviders,
    SubjectService,
    ...subjectProviders,
    StudyAreaService,
    ...studyAreaProviders,
    LevelService,
    ...levelProviders,
    InstituteService,
    ...instituteProviders,
    ConcursoService,
    ...concursoProviders,
  ],
  exports: [
    QuestionService,
    SubjectService,
    StudyAreaService,
    LevelService,
    InstituteService,
    ConcursoService,
  ],
})
export class QuestionModule {}
