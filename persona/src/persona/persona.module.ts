import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Persona } from './entities/persona.entity';
import { PersonaController } from './persona.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona]), 
  ],
  providers: [PersonaService],
  controllers: [PersonaController],
})
export class PersonaModule {}
