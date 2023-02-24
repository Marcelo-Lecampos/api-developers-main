import { IsBoolean, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';
const { ApiProperty: doc } = developerDocumentation;

export class UpdateDeveloperDto {
  @ApiProperty(doc.UpdateDeveloper.acceptedRemoteWork)
  @IsBoolean()
  @IsOptional()
  public acceptedRemoteWork: boolean;

  @ApiProperty(doc.UpdateDeveloper.monthsOfExperience)
  @IsNumber()
  @IsOptional()
  public monthsOfExperience: number;

  @ApiProperty(doc.UpdateDeveloper.technologies)
  @IsOptional()
  public technologies: number[];
}
