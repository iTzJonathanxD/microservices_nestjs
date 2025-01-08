import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateSeparacioncanchaDto } from './dto/create-separacioncancha.dto';
import { UpdateSeparacioncanchaDto } from './dto/update-separacioncancha.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('separacioncanchas')
export class SeparacioncanchaController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createSeparacioncanchaDto: CreateSeparacioncanchaDto) {
    try {
      const separacioncancha = await firstValueFrom(
        this.client.send({ cmd: 'create-separacioncancha' }, createSeparacioncanchaDto)
      );
      return separacioncancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const separacionescancha = await firstValueFrom(
        this.client.send({ cmd: 'get-separacioncanchas' }, {})
      );
      return separacionescancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const separacioncancha = await firstValueFrom(
        this.client.send({ cmd: 'get-separacioncancha' }, id)
      );
      return separacioncancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateSeparacioncanchaDto: UpdateSeparacioncanchaDto) {
    try {
      const updatedSeparacioncancha = await firstValueFrom(
        this.client.send({ cmd: 'update-separacioncancha' }, { id, ...updateSeparacioncanchaDto })
      );
      return updatedSeparacioncancha;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-separacioncancha' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
