import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaInput: CreatePersonaDto): Promise<Persona> {
    const persona = this.personaRepository.create(createPersonaInput);
    if (!persona.nombre || !persona.identificacion) {
      throw new Error('El nombre y la identificación de la persona son obligatorios');
    }
    return await this.personaRepository.save(persona);
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOne({
      where: { id },
    });
    if (!persona) {
      throw new Error(`Persona con id ${id} no encontrada`);
    }
    return persona;
  }

  async update(id: number, updatePersonaInput: UpdatePersonaDto): Promise<Persona> {
    const persona = await this.findOne(id);
    if (!persona) {
      throw new Error(`Persona con id ${id} no encontrada`);
    }
    Object.assign(persona, updatePersonaInput);
    return await this.personaRepository.save(persona);
  }

  async remove(id: number): Promise<Persona> {
    const persona = await this.findOne(id);
    if (!persona) {
      throw new Error(`Persona con id ${id} no encontrada`);
    }
    await this.personaRepository.remove(persona);
    return {...persona, id};
  }
}
