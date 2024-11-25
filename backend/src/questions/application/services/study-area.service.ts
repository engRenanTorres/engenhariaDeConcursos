import { Injectable, Logger } from '@nestjs/common';
import { CreateStudyAreaDto } from '../dto/create-study-area.dto';
import { UpdateStudyAreaDto } from '../dto/update-study-area.dto';
import { StudyAreaRepository } from '../../infrastructure/repositories/study-area.repository';
import { StudyArea } from '../../domain/entities/study-area.entity';

@Injectable()
export class StudyAreaService {
  constructor(private readonly studyAreasRepository: StudyAreaRepository) {}
  private logger: Logger = new Logger('StudyAreaService');

  async create(createStudyAreaDto: CreateStudyAreaDto) {
    const studyArea = await this.studyAreasRepository.create(
      createStudyAreaDto,
    );
    return studyArea;
  }

  async findAll() {
    return await this.studyAreasRepository.findAllWithSubjects();
  }

  async findOne(id: number) {
    const studyArea = await this.studyAreasRepository.findById(id, [
      'subjects',
    ]);
    return studyArea;
  }

  async findOneByName(name: string) {
    return await this.studyAreasRepository.findOneByName(name);
  }

  async findById(id: number): Promise<StudyArea> {
    const studyArea = await this.studyAreasRepository.findById(id);
    return studyArea;
  }

  async update(id: number, updateStudyAreaDto: UpdateStudyAreaDto) {
    const studyArea = await this.studyAreasRepository.update(
      id,
      updateStudyAreaDto,
    );
    return studyArea;
  }

  async remove(id: number) {
    return this.studyAreasRepository.remove(id);
  }
}
