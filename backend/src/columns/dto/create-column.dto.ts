import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la columna no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
  name: string;
}
