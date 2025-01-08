import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteInput: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(createPacienteInput);
    if (!paciente.nombre) {
      throw new Error('El nombre del paciente es obligatorio');
    }
    if (!paciente.identificacion) {
      throw new Error('La identificación del paciente es obligatoria');
    }
    return await this.pacienteRepository.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find();
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ id });
    if (!paciente) {
      throw new Error(`Paciente con id ${id} no encontrado`);
    }
    return paciente;
  }

  async update(id: number, updatePacienteInput: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id);
    if (!paciente) {
      throw new Error(`Paciente con id ${id} no encontrado`);
    }
    Object.assign(paciente, updatePacienteInput);
    return await this.pacienteRepository.save(paciente);
  }

  async remove(id: number): Promise<Paciente> {
    const paciente = await this.findOne(id);
    if (!paciente) {
      throw new Error(`Paciente con id ${id} no encontrado`);
    }
    await this.pacienteRepository.remove(paciente);
    return { ...paciente, id };
  }
}
