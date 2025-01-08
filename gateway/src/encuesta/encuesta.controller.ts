import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('encuestas')
export class EncuestaController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createEncuestaDto: CreateEncuestaDto) {
    try {
      const encuesta = await firstValueFrom(
        this.client.send({ cmd: 'create-encuesta' }, createEncuestaDto)
      );
      return encuesta;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const encuestas = await firstValueFrom(
        this.client.send({ cmd: 'get-encuestas' }, {})
      );
      return encuestas;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const encuesta = await firstValueFrom(
        this.client.send({ cmd: 'get-encuesta' }, id)
      );
      return encuesta;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEncuestaDto: UpdateEncuestaDto) {
    try {
      const updatedEncuesta = await firstValueFrom(
        this.client.send({ cmd: 'update-encuesta' }, { id, ...updateEncuestaDto })
      );
      return updatedEncuesta;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-encuesta' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
