import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('pacientes')
export class PacienteController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createPacienteDto: CreatePacienteDto) {
    try {
      const paciente = await firstValueFrom(
        this.client.send({ cmd: 'create-paciente' }, createPacienteDto)
      );
      return paciente;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const pacientes = await firstValueFrom(
        this.client.send({ cmd: 'get-pacientes' }, {})
      );
      return pacientes;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const paciente = await firstValueFrom(
        this.client.send({ cmd: 'get-paciente' }, id )
      );
      return paciente;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePacienteDto: UpdatePacienteDto) {
    try {
      const updatedPaciente = await firstValueFrom(
        this.client.send({ cmd: 'update-paciente' }, { id, ...updatePacienteDto })
      );
      return updatedPaciente;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-paciente' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
