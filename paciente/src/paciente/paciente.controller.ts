import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller()
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @MessagePattern({ cmd: 'create-paciente' })
  create(@Payload() data: CreatePacienteDto) {
    return this.pacienteService.create(data);
  }

  @MessagePattern({ cmd: 'get-pacientes' })
  findAll() {
    return this.pacienteService.findAll();
  }

  @MessagePattern({ cmd: 'get-paciente' })
  findOne(@Payload() id: number) {
    return this.pacienteService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-paciente' })
  update(@Payload() payload: { id: number; data: UpdatePacienteDto }) {
    const { id, data } = payload;
    return this.pacienteService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-paciente' })
  remove(@Payload() id: number) {
    return this.pacienteService.remove(id);
  }
}
