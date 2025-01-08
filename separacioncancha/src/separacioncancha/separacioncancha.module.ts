import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeparacionCanchaService } from './separacioncancha.service';
import { SeparacionCancha } from './entities/separacioncancha.entity';
import { Cancha } from './entities/cancha.entity';
import { Deportista } from './entities/deportista.entity';
import { SeparacionCanchaController } from './separacioncancha.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeparacionCancha, Cancha, Deportista]),
  ],
  providers: [SeparacionCanchaService],
  controllers: [SeparacionCanchaController],
})
export class SeparacionCanchaModule {}

