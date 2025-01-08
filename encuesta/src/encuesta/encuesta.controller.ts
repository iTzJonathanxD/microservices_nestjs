import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EncuestaService } from './encuesta.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';

@Controller()
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @MessagePattern({ cmd: 'create-encuesta' })
  create(@Payload() data: CreateEncuestaDto) {
    return this.encuestaService.create(data);
  }

  @MessagePattern({ cmd: 'get-encuestas' })
  findAll() {
    return this.encuestaService.findAll();
  }

  @MessagePattern({ cmd: 'get-encuesta' })
  findOne(@Payload() id: number) {
    return this.encuestaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-encuesta' })
  update(@Payload() payload: { id: number; data: UpdateEncuestaDto }) {
    const { id, data } = payload;
    return this.encuestaService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-encuesta' })
  remove(@Payload() id: number) {
    return this.encuestaService.remove(id);
  }
}
