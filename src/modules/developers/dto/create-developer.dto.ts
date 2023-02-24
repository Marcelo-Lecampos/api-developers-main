import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';
const { ApiProperty: doc } = developerDocumentation;

export class CreateDeveloperDto {
  @ApiProperty(doc.CreateDeveloper.acceptedRemoteWork)
  @IsBoolean()
  @IsOptional()
  public acceptedRemoteWork: boolean;

  @ApiProperty(doc.CreateDeveloper.monthsOfExperience)
  @IsNumber()
  @IsNotEmpty()
  public monthsOfExperience: number;

  @ApiProperty(doc.CreateDeveloper.user_id)
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @ApiProperty(doc.CreateDeveloper.technologies)
  @IsNotEmpty()
  public technologies: number[];
}
