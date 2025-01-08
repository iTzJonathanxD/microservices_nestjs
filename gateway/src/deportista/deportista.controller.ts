import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateDeportistaDto } from './dto/create-deportista.dto';
import { UpdateDeportistaDto } from './dto/update-deportista.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('deportistas')
export class DeportistaController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createDeportistaDto: CreateDeportistaDto) {
    try {
      const deportista = await firstValueFrom(
        this.client.send({ cmd: 'create-deportista' }, createDeportistaDto)
      );
      return deportista;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const deportistas = await firstValueFrom(
        this.client.send({ cmd: 'get-deportistas' }, {})
      );
      return deportistas;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const deportista = await firstValueFrom(
        this.client.send({ cmd: 'get-deportista' }, id )
      );
      return deportista;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDeportistaDto: UpdateDeportistaDto) {
    try {
      const updatedDeportista = await firstValueFrom(
        this.client.send({ cmd: 'update-deportista' }, { id, ...updateDeportistaDto })
      );
      return updatedDeportista;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-deportista' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
