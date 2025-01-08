import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller()
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @MessagePattern({ cmd: 'create-persona' })
  create(@Payload() data: CreatePersonaDto) {
    return this.personaService.create(data);
  }

  @MessagePattern({ cmd: 'get-personas' })
  findAll() {
    return this.personaService.findAll();
  }

  @MessagePattern({ cmd: 'get-persona' })
  findOne(@Payload() id: number) {
    return this.personaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-persona' })
  update(@Payload() payload: { id: number; data: UpdatePersonaDto }) {
    const { id, data } = payload;
    return this.personaService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete-persona' })
  remove(@Payload() id: number) {
    return this.personaService.remove(id);
  }
}
