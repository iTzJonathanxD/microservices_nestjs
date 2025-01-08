import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SeparacionCanchaService } from './separacioncancha.service';
import { CreateSeparacionCanchaDto } from './dto/create-separacioncancha.dto';
import { UpdateSeparacioncanchaDto } from './dto/update-separacioncancha.dto';

@Controller()
export class SeparacionCanchaController {
  constructor(private readonly separacionCanchaService: SeparacionCanchaService) {}

  @MessagePattern({ cmd: 'create-separacioncancha' })
  create(@Payload() data: CreateSeparacionCanchaDto) {
    return this.separacionCanchaService.create(data);
  }

  @MessagePattern({ cmd: 'get-separacioncanchas' })
  findAll() {
    return this.separacionCanchaService.findAll();
  }

  @MessagePattern({ cmd: 'get-separacioncancha' })
  findOne(@Payload() id: number) {
    return this.separacionCanchaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-separacioncancha' })
  update(@Payload() payload: { id: number; data: UpdateSeparacioncanchaDto }) {
    const { id, data } = payload;
    return this.separacionCanchaService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-separacioncancha' })
  remove(@Payload() id: number) {
    return this.separacionCanchaService.remove(id);
  }
}
