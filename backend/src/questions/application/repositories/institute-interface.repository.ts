import { Institute } from '../../domain/entities/institute.entity';
import { CreateInstituteDto } from '../dto/create-institute.dto';

export interface InstituteRepositoryInterface {
  create(createDto: CreateInstituteDto): Promise<Institute>;
  findAll(relations?: string[]): Promise<Institute[]>;
  findById(id: number, relations?: string[]): Promise<Institute>;
  update(id: number, updateDto: Partial<Institute>): Promise<Institute>;
  remove(id: number): Promise<Institute>;
}
