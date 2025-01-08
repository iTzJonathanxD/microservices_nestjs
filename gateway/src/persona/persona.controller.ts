import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('personas')
export class PersonaController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    try {
      const persona = await firstValueFrom(
        this.client.send({ cmd: 'create-persona' }, createPersonaDto)
      );
      return persona;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const personas = await firstValueFrom(
        this.client.send({ cmd: 'get-personas' }, {})
      );
      return personas;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const persona = await firstValueFrom(
        this.client.send({ cmd: 'get-persona' }, id)
      );
      return persona;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePersonaDto: UpdatePersonaDto) {
    try {
      const updatedPersona = await firstValueFrom(
        this.client.send({ cmd: 'update-persona' }, { id, ...updatePersonaDto })
      );
      return updatedPersona;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-persona' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
