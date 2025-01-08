import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('registros')
export class RegistroController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createRegistroDto: CreateRegistroDto) {
    try {
      const registro = await firstValueFrom(
        this.client.send({ cmd: 'create-registro' }, createRegistroDto)
      );
      return registro;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const registros = await firstValueFrom(
        this.client.send({ cmd: 'get-registros' }, {})
      );
      return registros;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const registro = await firstValueFrom(
        this.client.send({ cmd: 'get-registro' }, id)
      );
      return registro;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRegistroDto: UpdateRegistroDto) {
    try {
      const updatedRegistro = await firstValueFrom(
        this.client.send({ cmd: 'update-registro' }, { id, ...updateRegistroDto })
      );
      return updatedRegistro;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-registro' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
