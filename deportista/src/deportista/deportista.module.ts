import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeportistaService } from './deportista.service';
import { Deportista } from './entities/deportista.entity';
import { DeportistaController } from './deportista.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deportista])],
  providers: [DeportistaService],
  controllers: [DeportistaController],
})
export class DeportistaModule {}
