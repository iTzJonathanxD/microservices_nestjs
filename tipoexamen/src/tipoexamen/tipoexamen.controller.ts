import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TipoexamenService } from './tipoexamen.service';
import { CreateTipoexamanDto } from './dto/create-tipoexaman.dto';
import { UpdateTipoexamanDto } from './dto/update-tipoexaman.dto';

@Controller()
export class TipoExamenController {
  constructor(private readonly tipoExamenService: TipoexamenService) {}

  @MessagePattern({ cmd: 'create-tipoexamen' })
  create(@Payload() data: CreateTipoexamanDto) {
    return this.tipoExamenService.create(data);
  }

  @MessagePattern({ cmd: 'get-tipoexamenes' })
  findAll() {
    return this.tipoExamenService.findAll();
  }

  @MessagePattern({ cmd: 'get-tipoexamen' })
  findOne(@Payload() id: number) {
    return this.tipoExamenService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-tipoexamen' })
  update(@Payload() payload: { id: number; data: UpdateTipoexamanDto }) {
    const { id, data } = payload;
    return this.tipoExamenService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-tipoexamen' })
  remove(@Payload() id: number) {
    return this.tipoExamenService.remove(id);
  }
}
