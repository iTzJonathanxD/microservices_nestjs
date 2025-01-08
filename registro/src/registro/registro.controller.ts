import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Controller()
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @MessagePattern({ cmd: 'create-registro' })
  create(@Payload() data: CreateRegistroDto) {
    return this.registroService.create(data);
  }

  @MessagePattern({ cmd: 'get-registros' })
  findAll() {
    return this.registroService.findAll();
  }

  @MessagePattern({ cmd: 'get-registro' })
  findOne(@Payload() id: number) {
    return this.registroService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-registro' })
  update(@Payload() payload: { id: number; data: UpdateRegistroDto }) {
    const { id, data } = payload;
    return this.registroService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-registro' })
  remove(@Payload() id: number) {
    return this.registroService.remove(id);
  }
}
