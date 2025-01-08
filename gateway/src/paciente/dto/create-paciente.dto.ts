import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePacienteDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del paciente es obligatorio' })
  nombre: string;

  @IsString({ message: 'La identificación debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La identificación del paciente es obligatoria' })
  identificacion: string;
  
}
