import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';  
import { PacienteController } from './paciente.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente]), 
  ],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule {}
