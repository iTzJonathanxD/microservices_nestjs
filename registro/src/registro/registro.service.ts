import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registro } from 'src/registro/entities/registro.entity';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Persona } from './entities/persona.entity';
import { Encuesta } from './entities/encuesta.entity';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,

    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
  ) {}

  async create(createRegistroInput: CreateRegistroDto): Promise<Registro> {
    const { idPersona, idEncuesta, fecha, hora, ubicacion } = createRegistroInput;

    const persona = await this.personaRepository.findOne({ where: { id: idPersona } });
    if (!persona) {
      throw new NotFoundException(`Persona con ID ${idPersona} no encontrada`);
    }

    const encuesta = await this.encuestaRepository.findOne({ where: { id: idEncuesta } });
    if (!encuesta) {
      throw new NotFoundException(`Encuesta con ID ${idEncuesta} no encontrada`);
    }

    const nuevoRegistro = this.registroRepository.create({
      persona,
      encuesta,
      fecha,
      hora,
      ubicacion,
    });

    return await this.registroRepository.save(nuevoRegistro);
  }

  async findAll(): Promise<Registro[]> {
    return await this.registroRepository.find({
      relations: ['persona', 'encuesta'], 
    });
  }

  // Obtener un registro por ID
  async findOne(id: number): Promise<Registro> {
    const registro = await this.registroRepository.findOne({
      where: { id },
      relations: ['persona', 'encuesta'], 
    });

    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return registro;
  }

  async update(id: number, updateRegistroInput: UpdateRegistroDto): Promise<Registro> {
    const registro = await this.findOne(id);
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    Object.assign(registro, updateRegistroInput);
    return await this.registroRepository.save(registro);
  }

  async remove(id: number): Promise<Registro> {
    const registro = await this.findOne(id);
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    await this.registroRepository.remove(registro);
    return { ...registro, id }; 
  }
}
