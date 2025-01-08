import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeparacionCancha } from './entities/separacioncancha.entity';
import { CreateSeparacionCanchaDto } from './dto/create-separacioncancha.dto';
import { UpdateSeparacioncanchaDto } from './dto/update-separacioncancha.dto';
import { Cancha } from './entities/cancha.entity';
import { Deportista } from './entities/deportista.entity';

@Injectable()
export class SeparacionCanchaService {
  constructor(
    @InjectRepository(SeparacionCancha)
    private readonly separacionCanchaRepository: Repository<SeparacionCancha>,

    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,

    @InjectRepository(Deportista)
    private readonly deportistaRepository: Repository<Deportista>,
  ) {}

  async create(createSeparacionCanchaInput: CreateSeparacionCanchaDto): Promise<SeparacionCancha> {
    const { idCancha, idDeportista, fechaSeparacion, horaDesde, horaHasta } = createSeparacionCanchaInput;

    const cancha = await this.canchaRepository.findOne({ where: { id: idCancha } });
    if (!cancha) {
      throw new NotFoundException(`Cancha con ID ${idCancha} no encontrada`);
    }

    const deportista = await this.deportistaRepository.findOne({ where: { id: idDeportista } });
    if (!deportista) {
      throw new NotFoundException(`Deportista con ID ${idDeportista} no encontrado`);
    }

    const separacionCancha = this.separacionCanchaRepository.create({
      cancha,
      deportista,
      fechaSeparacion,
      horaDesde,
      horaHasta,
    });

    return await this.separacionCanchaRepository.save(separacionCancha);
  }

  async findAll(): Promise<SeparacionCancha[]> {
    return await this.separacionCanchaRepository.find({ relations: ['cancha', 'deportista'] });
  }

  async findOne(id: number): Promise<SeparacionCancha> {
    const separacionCancha = await this.separacionCanchaRepository.findOne({
      where: { id },
      relations: ['cancha', 'deportista'],
    });
    if (!separacionCancha) {
      throw new NotFoundException(`Separación de Cancha con ID ${id} no encontrada`);
    }
    return separacionCancha;
  }

  async update(id: number, updateSeparacionCanchaInput: UpdateSeparacioncanchaDto): Promise<SeparacionCancha> {
    const separacionCancha = await this.findOne(id);
    if (!separacionCancha) {
      throw new NotFoundException(`Separación de Cancha con ID ${id} no encontrada`);
    }

    Object.assign(separacionCancha, updateSeparacionCanchaInput);

    return await this.separacionCanchaRepository.save(separacionCancha);
  }

  async remove(id: number): Promise<SeparacionCancha> {
    const separacionCancha = await this.findOne(id);
    if (!separacionCancha) {
      throw new NotFoundException(`Separación de Cancha con ID ${id} no encontrada`);
    }

    await this.separacionCanchaRepository.remove(separacionCancha);
    return { ...separacionCancha, id };
  }
}
