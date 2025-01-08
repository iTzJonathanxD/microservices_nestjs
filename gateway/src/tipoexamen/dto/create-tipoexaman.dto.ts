

import { IsString, IsOptional } from 'class-validator';

export class CreateTipoexamanDto {
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @IsString({ message: 'Las indicaciones deben ser una cadena de texto' })
  indicaciones: string;
}
