import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { DeveloperEntity } from '../entities/developer.entity';
import { TechnologyEntity } from '../entities/technology.entity';
import { DeveloperService } from '../services/developer.service';
import { TechnologyService } from '../services/technology.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';
const {
  ApiOperation: doc,
  ApiResponse: resp,
  ApiBody: body,
} = developerDocumentation;

@ApiTags('developer')
@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private technologyService: TechnologyService,
  ) {}

  @ApiOperation(doc.getDeveloperById)
  @ApiOkResponse(resp.getDeveloperById.ok)
  @ApiNotFoundResponse(resp.getDeveloperById.error)
  @Get('getDeveloperById/:id')
  async getDeveloperById(@Param('id') id: number): Promise<DeveloperEntity> {
    return await this.developerService.findById(id);
  }

  @ApiOperation(doc.getTechnologyById)
  @ApiOkResponse(resp.getTechnologyById.ok)
  @ApiNotFoundResponse(resp.getTechnologyById.error)
  @Get('getTechnologyById/:id')
  async getTechnologyById(@Param('id') id: number): Promise<TechnologyEntity> {
    return await this.technologyService.findById(id);
  }

  @ApiOperation(doc.createTechnology)
  @ApiOkResponse(resp.createTechnology.ok)
  @ApiBadRequestResponse(resp.createTechnology.error)
  @Post('createTechnology')
  async createTechnology(
    @Body() newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    return await this.technologyService.createTechnology(newTechnology);
  }
  @ApiOperation(doc.createManyTechnologies)
  @ApiBody(body.createManyTechnologies)
  @ApiOkResponse(resp.createManyTechnologies.ok)
  @ApiBadRequestResponse(resp.createManyTechnologies.error)
  @Post('createManyTechnologies')
  async createManyTechnologies(
    @Body() newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    return await this.technologyService.createManyTechnologies(newTechnologies);
  }

  @ApiOperation(doc.createDeveloper)
  @ApiOkResponse(resp.createDeveloper.ok)
  @ApiBadRequestResponse(resp.createDeveloper.error[0])
  @ApiNotFoundResponse(resp.createDeveloper.error[1])
  @Post('createDeveloper')
  async createDeveloper(
    @Body() newDeveloper: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.createDeveloper(newDeveloper);
  }

  @ApiOperation(doc.updateDeveloper)
  @ApiOkResponse(resp.updateDeveloper.ok)
  @ApiBadRequestResponse(resp.updateDeveloper.error[0])
  @ApiNotFoundResponse(resp.updateDeveloper.error[1])
  @Patch('updateDeveloper/:id')
  async updateDeveloper(
    @Param('id') id: number,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.updateDeveloper(id, updateDeveloperDto);
  }
}
