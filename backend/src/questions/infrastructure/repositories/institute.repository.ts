import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InstituteORM } from '../orm-entities/institute.db-entity';
import { Repository } from 'typeorm';
import { CreateInstituteDto } from '../../application/dto/create-institute.dto';
import { UpdateInstituteDto } from '../../application/dto/update-institute.dto';
import { MessagesHelper } from '../../../common/helpers/message.helper';

@Injectable()
export class InstituteRepository {
  constructor(
    @Inject('INSTITUTE_REPOSITORY')
    private readonly instituteRepositoryOrm: Repository<InstituteORM>,
  ) {}

  private logger: Logger = new Logger('InstituteService');

  async create(createInstituteDto: CreateInstituteDto) {
    const institute = this.instituteRepositoryOrm.create(createInstituteDto);
    return await this.instituteRepositoryOrm.save(institute);
  }

  async findAll() {
    return await this.instituteRepositoryOrm.find();
  }

  async findById(id: number): Promise<InstituteORM> {
    const user = await this.instituteRepositoryOrm.findOneBy({ id: id });
    this.checkIfExist(user, id);
    return user;
  }

  async update(id: number, updateInstituteDto: UpdateInstituteDto) {
    const studyArea = await this.instituteRepositoryOrm.preload({
      id,
      ...updateInstituteDto,
    });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.instituteRepositoryOrm.save(studyArea);
  }

  async remove(id: number) {
    const entity = await this.instituteRepositoryOrm.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.instituteRepositoryOrm.remove(entity);
  }
  private checkIfExist(entity: object, id: number) {
    if (!entity) {
      throw new NotFoundException(`Institute not found by id ${id}`);
    }
  }
}
