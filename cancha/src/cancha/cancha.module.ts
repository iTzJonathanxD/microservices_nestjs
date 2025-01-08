import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanchaService } from './cancha.service';
import { Cancha } from './entities/cancha.entity';
import { CanchaController } from './cancha.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cancha])],
  providers: [CanchaService],
  controllers: [CanchaController],
})
export class CanchaModule {}
