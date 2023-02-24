import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';
const { ApiProperty: doc } = developerDocumentation;

export class CreateTechnologyDto {
  @ApiProperty(doc.CreateTechnology.name)
  @IsString()
  @IsNotEmpty()
  public name: string;
}
