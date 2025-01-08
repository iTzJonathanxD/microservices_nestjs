import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { TipoexamenService } from './tipoexamen.service';
import { TipoExamen } from './entities/tipoexaman.entity';  
import { TipoExamenController } from './tipoexamen.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoExamen]), 
  ],
  controllers: [TipoExamenController],
  providers: [TipoexamenService],
})
export class TipoexamenModule {}
