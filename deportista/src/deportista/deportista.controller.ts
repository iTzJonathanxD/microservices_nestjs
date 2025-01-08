import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeportistaService } from './deportista.service';
import { CreateDeportistaDto } from './dto/create-deportista.dto';
import { UpdateDeportistaDto } from './dto/update-deportista.dto';

@Controller()
export class DeportistaController {
  constructor(private readonly deportistaService: DeportistaService) {}

  @MessagePattern({ cmd: 'create-deportista' })
  create(@Payload() data: CreateDeportistaDto) {
    return this.deportistaService.create(data);
  }

  @MessagePattern({ cmd: 'get-deportistas' })
  findAll() {
    return this.deportistaService.findAll();
  }

  @MessagePattern({ cmd: 'get-deportista' })
  findOne(@Payload() id: number) {
    return this.deportistaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-deportista' })
  update(@Payload() payload: { id: number; data: UpdateDeportistaDto }) {
    const { id, data } = payload;
    return this.deportistaService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-deportista' })
  remove(@Payload() id: number) {
    return this.deportistaService.remove(id);
  }
}
