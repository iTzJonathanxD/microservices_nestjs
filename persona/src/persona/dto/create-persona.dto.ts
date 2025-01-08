import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePersonaDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString({ message: 'La identificación debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La identificación es obligatoria' })
  identificacion: string;

  @IsString({ message: 'Los detalles deben ser una cadena de texto' })
  detalles: string;
}
