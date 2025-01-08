import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';

@Controller()
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @MessagePattern({ cmd: 'create-cancha' })
  create(@Payload() data: CreateCanchaDto) {
    return this.canchaService.create(data);
  }

  @MessagePattern({ cmd: 'get-canchas' })
  findAll() {
    return this.canchaService.findAll();
  }

  @MessagePattern({ cmd: 'get-cancha' })
  findOne(@Payload() id: number) {
    return this.canchaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-cancha' })
  update(@Payload() payload: { id: number; data: UpdateCanchaDto }) {
    const { id, data } = payload;
    return this.canchaService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-cancha' })
  remove(@Payload() id: number) {
    return this.canchaService.remove(id);
  }
}
