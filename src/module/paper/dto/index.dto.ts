import { IsString, IsOptional, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaperDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  labels: string[];
}

export class UpdatePaperDto {
  id: number;

  @ValidateNested()
  @Type(() => CreatePaperDto)
  data: CreatePaperDto;
}

export class getPaperListPaginationDto {
  @IsInt()
  page: number;

  @IsInt()
  pageSize: number;
}

export class getPaperListPaginationByLabelDto {
  @IsInt()
  page: number;

  @IsInt()
  pageSize: number;

  @IsString()
  label: string;
}
