import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { ResultadoService } from './resultado.service';
import { Resultado } from './entities/resultado.entity';  
import { Paciente } from './entities/paciente.entity';
import { TipoExamen } from './entities/tipoexaman.entity';
import { ResultadoController } from './resultado.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resultado, Paciente, TipoExamen]), 
  ],
  controllers: [ResultadoController],
  providers: [ResultadoService],
})
export class ResultadoModule {}
