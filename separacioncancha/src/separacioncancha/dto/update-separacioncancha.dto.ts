import { PartialType } from '@nestjs/mapped-types';
import { CreateSeparacionCanchaDto } from './create-separacioncancha.dto';

export class UpdateSeparacioncanchaDto extends PartialType(CreateSeparacionCanchaDto) {
  id: number;
}
