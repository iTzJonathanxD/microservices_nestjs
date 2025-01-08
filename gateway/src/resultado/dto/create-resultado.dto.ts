
import { IsInt, IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateResultadoDto {
  @IsInt({ message: 'El ID del paciente debe ser un número entero' })
  idPaciente: number;

  @IsInt({ message: 'El ID del tipo de examen debe ser un número entero' })
  idTipoExamen: number;

  @IsString({ message: 'El resultado debe ser una cadena' })
  @IsNotEmpty({ message: 'El resultado es obligatorio' })
  resultado: string;

  @IsNumber({}, { message: 'El valor pagado debe ser un número' })
  valorPagado: number;

  @IsString({ message: 'Las observaciones deben ser una cadena' })
  @IsOptional()
  observaciones?: string;
}
