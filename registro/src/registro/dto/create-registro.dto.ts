import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRegistroDto {
  @IsInt({ message: 'El ID de la persona debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de la persona es obligatorio' })
  idPersona: number;

  @IsInt({ message: 'El ID de la encuesta debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de la encuesta es obligatorio' })
  idEncuesta: number;

  @IsNotEmpty({ message: 'La fecha de registro es obligatoria' })
  fecha: string;

  @IsString({ message: 'La hora debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La hora de registro es obligatoria' })
  hora: string;  

  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @IsOptional()
  ubicacion?: string;
}
