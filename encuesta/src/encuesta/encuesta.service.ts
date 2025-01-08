import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';

@Injectable()
export class EncuestaService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
  ) {}

  async create(createEncuestaInput: CreateEncuestaDto): Promise<Encuesta> {
    const encuesta = this.encuestaRepository.create(createEncuestaInput);
    if (!encuesta.descripcion) {
      throw new Error('La descripción de la encuesta es obligatoria');
    }
    return await this.encuestaRepository.save(encuesta);
  }

  async findAll(): Promise<Encuesta[]> {
    return await this.encuestaRepository.find();
  }

  async findOne(id: number): Promise<Encuesta> {
    const encuesta = await this.encuestaRepository.findOne({
      where: { id },
    });
    if (!encuesta) {
      throw new Error(`Encuesta con id ${id} no encontrada`);
    }
    return encuesta;
  }

  async update(id: number, updateEncuestaInput: UpdateEncuestaDto): Promise<Encuesta> {
    const encuesta = await this.findOne(id);
    if (!encuesta) {
      throw new Error(`Encuesta con id ${id} no encontrada`);
    }
    Object.assign(encuesta, updateEncuestaInput);
    return await this.encuestaRepository.save(encuesta);
  }

  async remove(id: number): Promise<Encuesta> {
    const encuesta = await this.findOne(id);
    if (!encuesta) {
      throw new Error(`Encuesta con id ${id} no encontrada`);
    }
    await this.encuestaRepository.remove(encuesta);
    return {...encuesta,id};
  }

}
