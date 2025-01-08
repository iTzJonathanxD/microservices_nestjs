import { PartialType } from '@nestjs/mapped-types';
import { CreateSeparacioncanchaDto } from './create-separacioncancha.dto';

export class UpdateSeparacioncanchaDto extends PartialType(CreateSeparacioncanchaDto) {
  id: number;
}
