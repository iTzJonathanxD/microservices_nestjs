import { IsString, IsOptional } from 'class-validator'; 

export class CreateCanchaDto {
  @IsString() 
  @IsOptional() 
  descripcion: string;
}
