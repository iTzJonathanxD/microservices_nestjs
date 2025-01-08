import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { PacienteModule } from './paciente/paciente.module';
import { PacienteController } from './paciente/paciente.controller';
import { ResultadoModule } from './resultado/resultado.module';
import { TipoexamenModule } from './tipoexamen/tipoexamen.module';
import { ResultadoController } from './resultado/resultado.controller';
import { TipoExamenController } from './tipoexamen/tipoexamen.controller';
import { SeparacioncanchaModule } from './separacioncancha/separacioncancha.module';
import { DeportistaModule } from './deportista/deportista.module';
import { CanchaModule } from './cancha/cancha.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { PersonaModule } from './persona/persona.module';
import { RegistroModule } from './registro/registro.module';
import { SeparacioncanchaController } from './separacioncancha/separacioncancha.controller';
import { DeportistaController } from './deportista/deportista.controller';
import { CanchaController } from './cancha/cancha.controller';
import { EncuestaController } from './encuesta/encuesta.controller';
import { PersonaController } from './persona/persona.controller';
import { RegistroController } from './registro/registro.controller';

@Module({
  imports: [PacienteModule, NatsModule, ResultadoModule, TipoexamenModule, SeparacioncanchaModule, DeportistaModule, CanchaModule, EncuestaModule, PersonaModule, RegistroModule],
  controllers: [PacienteController, ResultadoController, TipoExamenController, SeparacioncanchaController, DeportistaController, CanchaController, EncuestaController, PersonaController, RegistroController],
  providers: [],
})
export class AppModule {}
