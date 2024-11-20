import { Module } from "@nestjs/common";
import { QuestionService } from "../application/services/question.service";
import { QuestionController } from "./controllers/question.controller";
import { DatabaseModule } from "../../database/database.module";
import { questionProviders, studyAreaProviders, subjectProviders } from "./question.providers";
import { LevelModule } from "../../levels/level.module";
import { ConcursoModule } from "../../concurso/concurso.module";
import { UsersModule } from "../../users/users.module";
import { SubjectService } from "../application/services/subject.service";
import { SubjectController } from "./controllers/subject.controller";
import { StudyAreaService } from "../application/services/study-area.service";
import { StudyAreaController } from "./controllers/study-area.controller";

@Module({
  imports: [
    DatabaseModule,
    LevelModule,
    ConcursoModule,
    UsersModule,
  ],
  controllers: [QuestionController,SubjectController,StudyAreaController],
  providers: [
    QuestionService, ...questionProviders, 
    SubjectService, ...subjectProviders, 
    StudyAreaService, ...studyAreaProviders],
  exports: [QuestionService, SubjectService,StudyAreaService],
})
export class QuestionModule {}
