import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoexamanDto } from './create-tipoexaman.dto';

export class UpdateTipoexamanDto extends PartialType(CreateTipoexamanDto) {
  id: number;
}
