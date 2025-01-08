import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resultado } from 'src/resultado/entities/resultado.entity';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Paciente } from './entities/paciente.entity';
import { TipoExamen } from './entities/tipoexaman.entity';

@Injectable()
export class ResultadoService {
  constructor(
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,

    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(TipoExamen)
    private readonly tipoExamenRepository: Repository<TipoExamen>,
  ) {}

  async create(createResultadoInput: CreateResultadoDto): Promise<Resultado> {
    const { idPaciente, idTipoExamen, resultado, valorPagado, observaciones } = createResultadoInput;

    const paciente = await this.pacienteRepository.findOne({ where: { id: idPaciente } });
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${idPaciente} no encontrado`);
    }

    const tipoExamen = await this.tipoExamenRepository.findOne({ where: { id: idTipoExamen } });
    if (!tipoExamen) {
      throw new NotFoundException(`Tipo de Examen con ID ${idTipoExamen} no encontrado`);
    }

    const nuevoResultado = this.resultadoRepository.create({
      paciente,
      tipoExamen,
      resultado,
      valorPagado,
      observaciones,
    });

    return await this.resultadoRepository.save(nuevoResultado);
  }

  async findAll(): Promise<Resultado[]> {
    return await this.resultadoRepository.find({ relations: ['paciente', 'tipoExamen'] });
  }

  async findOne(id: number): Promise<Resultado> {
    const resultado = await this.resultadoRepository.findOne({
      where: { id },
      relations: ['paciente', 'tipoExamen'],
    });
    if (!resultado) {
      throw new NotFoundException(`Resultado con ID ${id} no encontrado`);
    }
    return resultado;
  }

  async update(id: number, updateResultadoInput: UpdateResultadoDto): Promise<Resultado> {
    const resultado = await this.findOne(id);
    if (!resultado) {
      throw new NotFoundException(`Resultado con ID ${id} no encontrado`);
    }

    Object.assign(resultado, updateResultadoInput);

    return await this.resultadoRepository.save(resultado);
  }

  async remove(id: number): Promise<Resultado> {
    const resultado = await this.findOne(id);
    if (!resultado) {
      throw new NotFoundException(`Resultado con ID ${id} no encontrado`);
    }

    await this.resultadoRepository.remove(resultado);
    return { ...resultado, id };
  }
}
