import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class MoveTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de la columna es requerido' })
  columnId: string;

  @IsInt()
  @Min(0, { message: 'La posición debe ser un número positivo' })
  position: number;
}
