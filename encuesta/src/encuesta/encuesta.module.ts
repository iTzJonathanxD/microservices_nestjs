import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { EncuestaController } from './encuesta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Encuesta]), 
  ],
  providers: [EncuestaService],
  controllers: [EncuestaController],
})
export class EncuestaModule {}
