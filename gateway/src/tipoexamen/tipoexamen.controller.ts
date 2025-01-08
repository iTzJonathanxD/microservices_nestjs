import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateTipoexamanDto } from './dto/create-tipoexaman.dto';
import { UpdateTipoexamanDto } from './dto/update-tipoexaman.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('tipoexamenes')
export class TipoExamenController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createTipoExamenDto: CreateTipoexamanDto) {
    try {
      const tipoExamen = await firstValueFrom(
        this.client.send({ cmd: 'create-tipoexamen' }, createTipoExamenDto)
      );
      return tipoExamen;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const tipoExamenes = await firstValueFrom(
        this.client.send({ cmd: 'get-tipoexamenes' }, {})
      );
      return tipoExamenes;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const tipoExamen = await firstValueFrom(
        this.client.send({ cmd: 'get-tipoexamen' }, id )
      );
      return tipoExamen;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTipoExamenDto: UpdateTipoexamanDto) {
    try {
      const updatedTipoExamen = await firstValueFrom(
        this.client.send({ cmd: 'update-tipoexamen' }, { id, ...updateTipoExamenDto })
      );
      return updatedTipoExamen;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-tipoexamen' }, id)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
