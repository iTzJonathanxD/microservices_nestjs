import { Injectable } from '@nestjs/common';
import { CreateTipoexamanDto } from './dto/create-tipoexaman.dto';
import { UpdateTipoexamanDto } from './dto/update-tipoexaman.dto';
import { Repository } from 'typeorm';
import { TipoExamen } from './entities/tipoexaman.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoexamenService {
  constructor(
    @InjectRepository(TipoExamen)
    private readonly tipoexamenRepository: Repository<TipoExamen>,
  ) {}

  async create(createTipoexamanInput: CreateTipoexamanDto): Promise<TipoExamen> {
    const tipoexamen = this.tipoexamenRepository.create(createTipoexamanInput);
    if (!tipoexamen.descripcion) {
      throw new Error('La descripción del tipo de examen es obligatoria');
    }
    return await this.tipoexamenRepository.save(tipoexamen);
  }

  async findAll(): Promise<TipoExamen[]> {
    return await this.tipoexamenRepository.find();
  }

  async findOne(id: number): Promise<TipoExamen> {
    const tipoexamen = await this.tipoexamenRepository.findOneBy({ id });
    if (!tipoexamen) {
      throw new Error(`Tipo de examen con id ${id} no encontrado`);
    }
    return tipoexamen;
  }

  async update(id: number, updateTipoexamanInput: UpdateTipoexamanDto): Promise<TipoExamen> {
    const tipoexamen = await this.findOne(id);
    if (!tipoexamen) {
      throw new Error(`Tipo de examen con id ${id} no encontrado`);
    }
    Object.assign(tipoexamen, updateTipoexamanInput);
    return await this.tipoexamenRepository.save(tipoexamen);
  }

  async remove(id: number): Promise<TipoExamen> {
    const tipoexamen = await this.findOne(id);
    if (!tipoexamen) {
      throw new Error(`Tipo de examen con id ${id} no encontrado`);
    }
    await this.tipoexamenRepository.remove(tipoexamen);
    return { ...tipoexamen, id };
  }
}
