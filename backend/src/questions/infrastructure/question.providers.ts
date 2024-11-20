import { DataSource } from "typeorm";
import { Question } from "../domain/entities/question.entity";
import { Subject } from "../domain/entities/subject.entity";
import { StudyArea } from "../domain/entities/study-area.entity";

export const questionProviders = [
  {
    provide: "QUESTION_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Question),
    inject: ["DATA_SOURCE"],
    
  },
];

export const subjectProviders = [
  {
    provide: "SUBJECT_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subject),
    inject: ["DATA_SOURCE"],
  },
];


export const studyAreaProviders = [
  {
    provide: "STUDY_AREA_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudyArea),
    inject: ["DATA_SOURCE"],
  },
];
