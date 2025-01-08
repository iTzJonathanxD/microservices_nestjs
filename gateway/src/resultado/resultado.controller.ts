import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Inject, 
  Logger, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('resultados')
export class ResultadoController {
  private readonly logger = new Logger(ResultadoController.name);

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createResultadoDto: CreateResultadoDto) {
    this.logger.log(`Solicitud para crear resultado: ${JSON.stringify(createResultadoDto)}`);
    try {
      const resultado = await firstValueFrom(
        this.client.send({ cmd: 'create-resultado' }, createResultadoDto)
      );
      this.logger.log(`Resultado creado exitosamente: ${JSON.stringify(resultado)}`);
      return resultado;
    } catch (error) {
      this.logger.error(`Error al crear resultado: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    this.logger.log('Solicitud para obtener todos los resultados');
    try {
      const resultados = await firstValueFrom(
        this.client.send({ cmd: 'get-resultados' }, {})
      );
      this.logger.log(`Resultados obtenidos: ${JSON.stringify(resultados)}`);
      return resultados;
    } catch (error) {
      this.logger.error(`Error al obtener resultados: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`Solicitud para obtener resultado con ID: ${id}`);
    try {
      const resultado = await firstValueFrom(
        this.client.send({ cmd: 'get-resultado' }, id)
      );
      this.logger.log(`Resultado obtenido: ${JSON.stringify(resultado)}`);
      return resultado;
    } catch (error) {
      this.logger.error(`Error al obtener resultado con ID ${id}: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateResultadoDto: UpdateResultadoDto) {
    this.logger.log(`Solicitud para actualizar resultado con ID ${id}: ${JSON.stringify(updateResultadoDto)}`);
    try {
      const updatedResultado = await firstValueFrom(
        this.client.send({ cmd: 'update-resultado' }, { id, ...updateResultadoDto })
      );
      this.logger.log(`Resultado actualizado: ${JSON.stringify(updatedResultado)}`);
      return updatedResultado;
    } catch (error) {
      this.logger.error(`Error al actualizar resultado con ID ${id}: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log(`Solicitud para eliminar resultado con ID: ${id}`);
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'delete-resultado' }, id)
      );
      this.logger.log(`Resultado eliminado con ID ${id}: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error al eliminar resultado con ID ${id}: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
