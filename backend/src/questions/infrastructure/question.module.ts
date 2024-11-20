import { Module } from "@nestjs/common";
import { QuestionService } from "../application/services/question.service";
import { QuestionController } from "./controllers/question.controller";
import { DatabaseModule } from "../../database/database.module";
import { levelProviders, questionProviders, studyAreaProviders, subjectProviders } from "./question.providers";
import { ConcursoModule } from "../../concurso/concurso.module";
import { UsersModule } from "../../users/users.module";
import { SubjectService } from "../application/services/subject.service";
import { SubjectController } from "./controllers/subject.controller";
import { StudyAreaService } from "../application/services/study-area.service";
import { StudyAreaController } from "./controllers/study-area.controller";
import { LevelService } from "../application/services/level.service";
import { LevelController } from "./controllers/level.controller";

@Module({
  imports: [
    DatabaseModule,
    ConcursoModule,
    UsersModule,
  ],
  controllers: [QuestionController,SubjectController,StudyAreaController,LevelController],
  providers: [
    QuestionService, ...questionProviders, 
    SubjectService, ...subjectProviders, 
    StudyAreaService, ...studyAreaProviders,
    LevelService, ...levelProviders,
  ],
  exports: [QuestionService, SubjectService,StudyAreaService, LevelService],
})
export class QuestionModule {}
