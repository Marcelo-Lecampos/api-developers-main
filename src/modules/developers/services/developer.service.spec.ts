import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/modules/users/services/user.service';
import { UserRepository } from 'src/modules/users/user.repository';
import { DeveloperStatic } from 'src/utils/mock/developersMock';
import { DeveloperRepository } from '../repositories/developer.repository';
import { TechnologyRepository } from '../repositories/technology.repository';
import { DeveloperService } from './developer.service';
import { TechnologyService } from './technology.service';

describe('DeveloperService', () => {
  let developerService: DeveloperService;
  let developerRepository: DeveloperRepository;
  let technologyService: TechnologyService;

  const mockDevRepository = {
    getById: jest.fn(),
    getByUser: jest.fn(),
    getAll: jest.fn(),
    createDeveloper: jest.fn(),
    updateDeveloper: jest.fn(),
  };

  const mockTechnologyRepository = {
    getById: jest.fn(),
  };

  const mockUserRepository = {
    getById: jest.fn(),
  };

  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        DeveloperService,
        TechnologyService,
        UserService,
        {
          provide: DeveloperRepository,
          useValue: mockDevRepository,
        },
        {
          provide: TechnologyRepository,
          useValue: mockTechnologyRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    developerService = module.get<DeveloperService>(DeveloperService);
    developerRepository = module.get<DeveloperRepository>(DeveloperRepository);
    technologyService = module.get<TechnologyService>(TechnologyService);
  });

  beforeEach(() => {
    mockDevRepository.createDeveloper.mockReset();
    mockDevRepository.updateDeveloper.mockReset();
    mockDevRepository.getById.mockReset();
    mockDevRepository.getByUser.mockReset();
    mockDevRepository.getAll.mockReset();
    mockTechnologyRepository.getById.mockReset();
    mockUserRepository.getById.mockReset();
  });

  afterAll(async () => {
    await module.close();
  });

  it('deveria ser definido developerService', () => {
    expect(developerService).toBeDefined();
  });

  it('deveria ser definido developerRepository', () => {
    expect(developerRepository).toBeDefined();
  });

  it('deveria ser definido technologyService', () => {
    expect(technologyService).toBeDefined();
  });
  it('deveria ser definido UserRepository', () => {
    expect(UserRepository).toBeDefined();
  });

  describe('findById', () => {
    it('deveria retornar o objeto developer', async () => {
      const developer = DeveloperStatic.developerData();
      mockDevRepository.getById.mockReturnValue(developer);
      const foundDeveloper = await developerService.findById(developer.id);
      expect(mockDevRepository.getById).toHaveBeenCalledTimes(1);
      expect(mockDevRepository.getById).toHaveBeenCalledWith(developer.id);
      expect(mockDevRepository.getById).toHaveReturnedWith(developer);
      expect(foundDeveloper).toMatchObject({ id: developer.id });
    });

    it('deveria retornar uma excessão devido ao valor enviado', async () => {
      mockDevRepository.getById.mockReturnValue(null); // não existe um dev com esse id
      const pathId = 2;

      expect(developerService.findById(pathId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('createDeveloper', () => {
    it('deve estar definido', () => {
      expect(developerService.createDeveloper).toBeDefined();
    });

    it('chama o método "createDeveloper" e criar corretamente', async () => {
      const DeveloperDTO = DeveloperStatic.developerDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getByUser.mockReturnValue(null); // não existe um dev já criado
      mockUserRepository.getById.mockReturnValue(1);
      mockDevRepository.createDeveloper.mockReturnValue(DeveloperEntity);

      DeveloperEntity.technologies.forEach((tech) => {
        mockTechnologyRepository.getById.mockReturnValue(tech);
      });

      const createDeveloper = await developerService.createDeveloper(
        DeveloperDTO,
      );
      expect(mockDevRepository.createDeveloper).toHaveBeenCalledTimes(1);
      expect(mockDevRepository.createDeveloper).toHaveReturnedWith(
        DeveloperEntity,
      );
      expect(createDeveloper).toMatchObject(DeveloperEntity);
    });

    it('chama o método "createDeveloper" e retornar uma excessão do tipo BadRequestException(entityWithArgumentsExists) devido ao dev já existir', async () => {
      const DeveloperDTO = DeveloperStatic.developerDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getByUser.mockReturnValue(DeveloperEntity); // já existe um dev criado
      mockUserRepository.getById.mockReturnValue(1);

      await developerService.createDeveloper(DeveloperDTO).catch((err) => {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err).toMatchObject({
          message: 'entityWithArgumentsExists',
        });
        expect(mockDevRepository.createDeveloper).toHaveBeenCalledTimes(0);
        expect(mockDevRepository.createDeveloper).not.toHaveBeenCalled();
        expect(mockDevRepository.createDeveloper).not.toHaveReturned();
      });
    });

    it('chama o método "createDeveloper" e por não encontrar uma tecnologia retorna um erro', async () => {
      const DeveloperDTO = DeveloperStatic.developerDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getByUser.mockReturnValue(null); // não existe um dev já criado
      mockUserRepository.getById.mockReturnValue(1); // existe um usuário
      mockDevRepository.createDeveloper.mockReturnValue(null); // não conseguiu salvar o dev

      DeveloperEntity.technologies.forEach(() => {
        mockTechnologyRepository.getById.mockReturnValueOnce(null);
      });

      await developerService.createDeveloper(DeveloperDTO).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toMatchObject({
          message: 'technologyNotFound',
        });
      });
    });

    it('chama o método "createDeveloper" e por não conseguir salvar o desenvolvedor no databse, retorna um erro', async () => {
      const DeveloperDTO = DeveloperStatic.developerDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getByUser.mockReturnValue(null); // não existe um dev já criado
      mockUserRepository.getById.mockReturnValue(1); // existe um usuário
      mockDevRepository.createDeveloper.mockReturnValue(null); // não conseguiu salvar o dev

      DeveloperEntity.technologies.forEach((tech) => {
        mockTechnologyRepository.getById.mockReturnValue(tech);
      });

      await developerService.createDeveloper(DeveloperDTO).catch((err) => {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err).toMatchObject({
          message: 'developerNotSave',
        });
        expect(mockDevRepository.createDeveloper).toHaveBeenCalledTimes(1);
        expect(mockDevRepository.createDeveloper).toHaveReturnedWith(null);
      });
    });
  });

  describe('updateDeveloper', () => {
    it('updateDeveloper deve estar definido', () => {
      expect(developerService.updateDeveloper).toBeDefined();
    });

    it('chama o método "updateDeveloper" e atualiza corretamente', async () => {
      const UpdatedDeveloperDto = DeveloperStatic.updatedDeveloperDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getById.mockReturnValue(DeveloperEntity); // já existe um dev criado
      mockDevRepository.updateDeveloper.mockReturnValue(DeveloperEntity);

      DeveloperEntity.technologies.forEach((tech) => {
        mockTechnologyRepository.getById.mockReturnValue(tech);
      });

      const updateDeveloper = await developerService.updateDeveloper(
        1,
        UpdatedDeveloperDto,
      );
      expect(updateDeveloper).toMatchObject(DeveloperEntity);
      expect(mockDevRepository.updateDeveloper).toHaveBeenCalledTimes(1);
      expect(mockDevRepository.updateDeveloper).toHaveReturnedWith(
        DeveloperEntity,
      );
    });

    it('chama o método "updateDeveloper" e retorna uma excessão do tipo NotFoundException(developerNotFound) devido ao dev não ser encontrado', async () => {
      const UpdatedDeveloperDto = DeveloperStatic.updatedDeveloperDto();

      mockDevRepository.getById.mockReturnValue(null); // não encontrou um dev no DB, retorna false e ativará o erro

      await developerService
        .updateDeveloper(1, UpdatedDeveloperDto)
        .catch((err) => {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err).toMatchObject({
            message: 'developerNotFound',
          });
          expect(mockDevRepository.updateDeveloper).not.toHaveBeenCalled();
          expect(mockDevRepository.updateDeveloper).not.toHaveReturned();
        });
    });
    it('chama o método "updateDeveloper" e retorna uma excessão do tipo NotFoundException(technologyNotFound) devido a tecnologia não ser encontrada', async () => {
      const UpdatedDeveloperDto = DeveloperStatic.updatedDeveloperDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getById.mockReturnValue(DeveloperEntity); // já existe um dev criado
      mockDevRepository.updateDeveloper.mockReturnValue(DeveloperEntity);

      DeveloperEntity.technologies.forEach(() => {
        mockTechnologyRepository.getById.mockReturnValueOnce(null);
      });

      await developerService
        .updateDeveloper(1, UpdatedDeveloperDto)
        .catch((err) => {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err).toMatchObject({
            message: 'technologyNotFound',
          });
          expect(mockDevRepository.updateDeveloper).not.toHaveBeenCalled();
          expect(mockDevRepository.updateDeveloper).not.toHaveReturned();
        });
    });
    it('chama o método "updateDeveloper" e retorna uma excessão do tipo BadRequestException(developerNotUpdate) devido a não conseguir upar o perfil do dev', async () => {
      const UpdatedDeveloperDto = DeveloperStatic.updatedDeveloperDto();
      const DeveloperEntity = DeveloperStatic.developerData();

      mockDevRepository.getById.mockReturnValue(DeveloperEntity); // já existe um dev criado
      mockDevRepository.updateDeveloper.mockRejectedValue(null);

      DeveloperEntity.technologies.forEach((tech) => {
        mockTechnologyRepository.getById.mockReturnValue(tech);
      });

      await developerService
        .updateDeveloper(1, UpdatedDeveloperDto)
        .catch((err) => {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err).toMatchObject({
            message: 'developerNotUpdate',
          });
          expect(mockDevRepository.updateDeveloper).toHaveBeenCalledTimes(1);
        });
    });
  });
});
