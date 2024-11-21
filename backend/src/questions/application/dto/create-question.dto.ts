import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '../../domain/entities/question.entity';
export class CreateChoicesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Possible answer to question.' })
  choice: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Question text.' })
  question: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: Answer,
    description: 'Answer of the question.',
  })
  answer: Answer;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Explaning tips.' })
  tip: string;

  @IsInt()
  @IsNotEmpty()
  levelId: number;

  @IsInt()
  @IsNotEmpty()
  subjectId: number;
  @IsInt()
  @IsNotEmpty()
  concursoId: number;

  @IsArray()
  @ApiProperty({ type: CreateChoicesDto, isArray: true })
  questionsChoices: CreateChoicesDto[];
}
