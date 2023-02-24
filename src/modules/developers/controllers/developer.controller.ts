import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { DeveloperEntity } from '../entities/developer.entity';
import { TechnologyEntity } from '../entities/technology.entity';
import { DeveloperService } from '../services/developer.service';
import { TechnologyService } from '../services/technology.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';
const { ApiOperation: doc } = developerDocumentation;

@ApiTags('developer')
@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private technologyService: TechnologyService,
  ) {}

  @ApiOperation(doc.getDeveloperById)
  @Get('getDeveloperById/:id')
  async getDeveloperById(@Param('id') id: number): Promise<DeveloperEntity> {
    return await this.developerService.findById(id);
  }

  @ApiOperation(doc.getTechnologyById)
  @Get('getTechnologyById/:id')
  async getTechnologyById(@Param('id') id: number): Promise<TechnologyEntity> {
    return await this.technologyService.findById(id);
  }

  @ApiOperation(doc.createTechnology)
  @Post('createTechnology')
  async createTechnology(
    @Body() newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    return await this.technologyService.createTechnology(newTechnology);
  }

  @ApiOperation(doc.createManyTechnologies)
  @Post('createManyTechnologies')
  async createManyTechnologies(
    @Body() newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    return await this.technologyService.createManyTechnologies(newTechnologies);
  }

  @ApiOperation(doc.createDeveloper)
  @Post('createDeveloper')
  async createDeveloper(
    @Body() newDeveloper: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.createDeveloper(newDeveloper);
  }

  @ApiOperation(doc.updateDeveloper)
  @Patch('updateDeveloper/:id')
  async updateDeveloper(
    @Param('id') id: number,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.updateDeveloper(id, updateDeveloperDto);
  }
}
