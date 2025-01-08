import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('canchas')
export class CanchaController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createCanchaDto: CreateCanchaDto) {
    try {
      const cancha = await firstValueFrom(
        this.client.send({ cmd: 'create-cancha' }, createCanchaDto)
      );
      return cancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const canchas = await firstValueFrom(
        this.client.send({ cmd: 'get-canchas' }, {})
      );
      return canchas;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const cancha = await firstValueFrom(
        this.client.send({ cmd: 'get-cancha' }, id)
      );
      return cancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCanchaDto: UpdateCanchaDto) {
    try {
      const updatedCancha = await firstValueFrom(
        this.client.send({ cmd: 'update-cancha' }, { id, ...updateCanchaDto })
      );
      return updatedCancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-cancha' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
