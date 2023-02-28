import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TecnologyStatic } from 'src/utils/mock/tecnologyMock';
import { TechnologyRepository } from '../repositories/technology.repository';
import { TechnologyService } from './technology.service';
const { createTechnologyDto, TecnologyData } = TecnologyStatic;

describe('TechnologyService', () => {
  let technologyService: TechnologyService;
  let technologyRepository: TechnologyRepository;

  const mockTechnologyRepository = {
    getById: jest.fn(),
    getAll: jest.fn(),
    getByName: jest.fn(),
    createTechnology: jest.fn(),
    createManyTechnologies: jest.fn(),
  };

  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        TechnologyService,
        {
          provide: TechnologyRepository,
          useValue: mockTechnologyRepository,
        },
      ],
    }).compile();

    technologyService = module.get<TechnologyService>(TechnologyService);
    technologyRepository =
      module.get<TechnologyRepository>(TechnologyRepository);
  });
  beforeEach(() => {
    mockTechnologyRepository.getById.mockReset();
    mockTechnologyRepository.getAll.mockReset();
    mockTechnologyRepository.getByName.mockReset();
    mockTechnologyRepository.createTechnology.mockReset();
    mockTechnologyRepository.createManyTechnologies.mockReset();
  });
  afterAll(async () => {
    await module.close();
  });

  it('technologyService deve estar definido', () => {
    expect(technologyService).toBeDefined();
  });
  it('technologyRepository deve estar definido', () => {
    expect(technologyRepository).toBeDefined();
  });

  describe('findById', () => {
    it('deve retornar uma tecnologia', async () => {
      mockTechnologyRepository.getById.mockReturnValue(TecnologyData); // null irá retornar um erro de tech n encontrada
      const result = await technologyService.findById(1);
      expect(result).toEqual(TecnologyData);
    });

    it('deve retornar um erro de tecnologia não encontrada do tipo NotFoundException(technologyNotFound)', async () => {
      mockTechnologyRepository.getById.mockReturnValue(null); // null dispara erro de não encontrado
      await technologyService.findById(1).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('technologyNotFound');
        expect(err.status).toBe(404);
      });
    });
  });

  describe('createTechnology', () => {
    it('deve criar uma tecnologia', async () => {
      mockTechnologyRepository.createTechnology.mockReturnValue(TecnologyData);
      mockTechnologyRepository.getByName.mockReturnValue(null); // deve ser null para não disparar erro de tech já existente
      const result = await technologyService.createTechnology(
        createTechnologyDto,
      );
      expect(result).toEqual(TecnologyData);
    });

    it('deve retornar um erro de tecnologia já existente do tipo BadRequestException(entityWithArgumentsExists)', async () => {
      mockTechnologyRepository.createTechnology.mockReturnValue(TecnologyData);
      mockTechnologyRepository.getByName.mockReturnValue(TecnologyData); // deve ter um valor para disparar erro de tech já existente
      await technologyService
        .createTechnology(createTechnologyDto)
        .catch((err) => {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err.message).toBe('entityWithArgumentsExists');
          expect(err.status).toBe(400);
        });
    });
    it('deve retornar um erro de falha em cadastrar no a tecnologia no DB', async () => {
      mockTechnologyRepository.createTechnology.mockReturnValue(null); // null dispara erro de falha ao cadastrar
      mockTechnologyRepository.getByName.mockReturnValue(null); // deve ser null para não disparar erro de tech já existente
      await technologyService
        .createTechnology(createTechnologyDto)
        .catch((err) => {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err.message).toBe('technologyNotSave');
          expect(err.status).toBe(400);
        });
    });
  });
  describe('createManyTechnologies', () => {
    it('deve criar várias tecnologias', async () => {
      mockTechnologyRepository.createManyTechnologies.mockReturnValue([
        TecnologyData,
        TecnologyData,
      ]);
      const result = await technologyService.createManyTechnologies([
        createTechnologyDto,
        createTechnologyDto,
      ]);
      expect(result).toEqual([TecnologyData, TecnologyData]);
    });
    it('deve retornar um erro de falha em cadastrar tecnologias no DB', async () => {
      mockTechnologyRepository.createManyTechnologies.mockRejectedValue(null); // null dispara erro de falha ao cadastrar
      await technologyService
        .createManyTechnologies([createTechnologyDto, createTechnologyDto])
        .catch((err) => {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err.message).toBe('entityWithArgumentsExists');
          expect(err.status).toBe(400);
        });
    });
  }); // describe('createManyTechnologies')
}); // describe('TechnologyService')
