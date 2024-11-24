import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInstituteDto } from '../dto/create-institute.dto';
import { UpdateInstituteDto } from '../dto/update-institute.dto';
import { InstituteORM } from '../../infrastructure/orm-entities/institute.db-entity';
import { InstituteRepository } from '../../infrastructure/repositories/institute.repository';

@Injectable()
export class InstituteService {
  constructor(private readonly instituteRepository: InstituteRepository) {}

  private logger: Logger = new Logger('InstituteService');

  async create(createInstituteDto: CreateInstituteDto) {
    const institute = this.instituteRepository.create(createInstituteDto);
    return institute;
  }

  async findAll() {
    return await this.instituteRepository.findAll();
  }

  async findById(id: number): Promise<InstituteORM> {
    const user = await this.instituteRepository.findById(id);
    this.checkIfUserExiste(user, id);
    return user;
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    // TODO: update institute
    return `This action updates a #${id} institute`;
  }

  remove(id: number) {
    // TODO: delete institute
    return `This action removes a #${id} institute`;
  }
  private checkIfUserExiste(user: object, id: number) {
    if (!user) {
      throw new NotFoundException(`Institute not found by id ${id}`);
    }
  }
}
