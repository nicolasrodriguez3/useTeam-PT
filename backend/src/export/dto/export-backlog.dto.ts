import { IsEmail, IsOptional, IsArray } from 'class-validator';

export class ExportBacklogDto {
  @IsEmail()
  email: string;

  @IsArray()
  @IsOptional()
  fields?: string[]; // Campos opcionales a exportar
}
