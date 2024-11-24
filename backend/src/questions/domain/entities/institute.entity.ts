import { Concurso } from './concurso.entity';
import { GenericEntity } from './generic.entity';

export class Institute extends GenericEntity {
  constructor(
    id: number,
    public name: string,
    public about: string,
    public contact: string,
    public concursos: Concurso[],
  ) {
    super(id);
  }
}
