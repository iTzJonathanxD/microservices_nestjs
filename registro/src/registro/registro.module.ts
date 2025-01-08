import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './entities/registro.entity';
import { Encuesta } from './entities/encuesta.entity';
import { Persona } from './entities/persona.entity';
import { RegistroController } from './registro.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Registro, Encuesta, Persona]), 
  ],
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
