import { IsInt, IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateSeparacionCanchaDto {
  @IsInt({ message: 'El ID de la cancha debe ser un número entero' })
  idCancha: number;

  @IsInt({ message: 'El ID del deportista debe ser un número entero' })
  idDeportista: number;

  @IsString()
  fechaSeparacion: string;

  @IsString({ message: 'La hora de inicio debe ser una cadena' })
  @IsNotEmpty({ message: 'La hora de inicio es obligatoria' })
  horaDesde: string;

  @IsString({ message: 'La hora de finalización debe ser una cadena' })
  @IsNotEmpty({ message: 'La hora de finalización es obligatoria' })
  horaHasta: string;
}
