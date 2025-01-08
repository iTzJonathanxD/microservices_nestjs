import { IsString } from 'class-validator';

export class CreateEncuestaDto {
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @IsString({ message: 'Los detalles de la encuesta deben ser una cadena de texto' })
  detallesEncuesta: string;
}
