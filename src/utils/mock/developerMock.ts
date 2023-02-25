import { CreateDeveloperDto } from 'src/modules/developers/dto/create-developer.dto';
import { UpdateDeveloperDto } from 'src/modules/developers/dto/update-developer.dto';
import {
  UserEntity,
  CityEntity,
  StateEntity,
  CountryEntity,
} from 'src/core/entities';
import { DeveloperEntity } from 'src/modules/developers/entities/developer.entity';

export class DeveloperStatic {
  static developerData(): DeveloperEntity {
    const developer = new DeveloperEntity();
    developer.id = 1;
    developer.acceptedRemoteWork = true;
    developer.monthsOfExperience = 1;
    developer.createdAt = new Date('2023-02-25T12:06:12.090Z');
    developer.updatedAt = new Date('2023-02-25T12:06:12.090Z');
    developer.deletedAt = null;
    developer.user_id = 1;

    developer.technologies = [
      {
        id: 1,
        name: 'NodeJS',
        createdAt: new Date('2023-02-25T12:06:12.090Z'),
        updatedAt: new Date('2023-02-25T12:06:12.090Z'),
        deletedAt: null,
      },
    ];

    const user = new UserEntity();
    user.name = 'Marcelo';
    user.email = 'marcelo.lecampos@gmail.com';
    user.salt = 'salt';
    user.password = 'papaiNoel';
    user.active = true;
    user.city_id = 1;

    const city = new CityEntity();
    city.name = 'São Paulo';
    city.state_id = 1;
    city.createdAt = new Date('2023-02-25T12:06:12.090Z');
    city.updatedAt = new Date('2023-02-25T12:06:12.090Z');
    city.deletedAt = null;

    const state = new StateEntity();
    state.name = 'São Paulo';
    state.country_id = 1;
    state.createdAt = new Date('2023-02-25T12:06:12.090Z');
    state.updatedAt = new Date('2023-02-25T12:06:12.090Z');
    state.deletedAt = null;

    const country = new CountryEntity();
    country.name = 'Brasil';
    country.language = 'Português';
    country.createdAt = new Date('2023-02-25T12:06:12.090Z');
    country.updatedAt = new Date('2023-02-25T12:06:12.090Z');
    country.deletedAt = null;

    state.country = country;
    city.state = state;
    user.city = city;
    developer.user = user;

    return developer;
  }

  static developerDto(): CreateDeveloperDto {
    const developerBodyDto = new CreateDeveloperDto();
    developerBodyDto.user_id = 1;
    developerBodyDto.technologies = [1];
    developerBodyDto.acceptedRemoteWork = true;
    developerBodyDto.monthsOfExperience = 1;

    return developerBodyDto;
  }

  static updatedDeveloperDto(): UpdateDeveloperDto {
    const updatedDeveloperBodyDto = new UpdateDeveloperDto();
    updatedDeveloperBodyDto.technologies = [1];
    updatedDeveloperBodyDto.acceptedRemoteWork = true;
    updatedDeveloperBodyDto.monthsOfExperience = 1;

    return updatedDeveloperBodyDto;
  }
}
