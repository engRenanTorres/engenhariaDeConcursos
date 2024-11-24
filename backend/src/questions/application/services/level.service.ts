import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { LevelRepository } from '../../infrastructure/repositories/level.repository';
import { Level } from '../../domain/entities/level.entity';

@Injectable()
export class LevelService {
  constructor(private readonly levelRepository: LevelRepository) {}

  private logger: Logger = new Logger('LevelService');

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const sup = this.levelRepository.create(createLevelDto);
    return sup;
  }

  async findAll(): Promise<Level[]> {
    return this.levelRepository.findAll();
  }

  async findById(id: number): Promise<Level> {
    const level = await this.levelRepository.findById(id);
    if (!level) {
      throw new NotFoundException('concurso not found with id: ' + id);
    }
    return level;
  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    return await this.levelRepository.update(id, updateLevelDto);
  }

  async remove(id: number): Promise<Level> {
    return await this.remove(id);
  }
}
