import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título de la tarea no puede estar vacío' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'El ID de la columna es requerido' })
  columnId: string;
}
