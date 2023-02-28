import { CreateTechnologyDto } from 'src/modules/developers/dto/create-technology.dto';
import { TechnologyEntity } from 'src/modules/developers/entities/technology.entity';

export class TecnologyStatic {
  static TecnologyData(): TechnologyEntity {
    const technology = new TechnologyEntity();
    technology.name = 'Node';
    technology.id = 1;
    technology.createdAt = new Date();
    technology.updatedAt = new Date();
    technology.deletedAt = new Date();
    return technology;
  }

  static createTechnologyDto(): CreateTechnologyDto {
    const technology = new CreateTechnologyDto();
    technology.name = 'Node';
    return technology;
  }
}
