import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeportistaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del deportista es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La identificación del deportista es obligatoria' })
  identificacion: string;

  @IsString()
  @IsNotEmpty({ message: 'El equipo del deportista es obligatorio' })
  equipo: string;
}
