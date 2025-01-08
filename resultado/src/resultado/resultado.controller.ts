import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResultadoService } from './resultado.service';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';

@Controller()
export class ResultadoController {
  constructor(private readonly resultadoService: ResultadoService) {}

  @MessagePattern({ cmd: 'create-resultado' })
  create(@Payload() data: CreateResultadoDto) {
    return this.resultadoService.create(data);
  }

  @MessagePattern({ cmd: 'get-resultados' })
  findAll() {
    return this.resultadoService.findAll();
  }

  @MessagePattern({ cmd: 'get-resultado' })
  findOne(@Payload() id: number) {
    return this.resultadoService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-resultado' })
  update(@Payload() payload: { id: number; data: UpdateResultadoDto }) {
    const { id, data } = payload;
    return this.resultadoService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-resultado' })
  remove(@Payload() id: number) {
    return this.resultadoService.remove(id);
  }
}
