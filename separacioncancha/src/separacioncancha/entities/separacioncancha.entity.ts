import { Cancha } from './cancha.entity';
import { Deportista } from './deportista.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('separaciones_cancha')
export class SeparacionCancha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCancha: number;

  @Column()
  idDeportista: number;

  @Column()
  fechaSeparacion: string;

  @Column()
  horaDesde: string;

  @Column()
  horaHasta: string;

  @ManyToOne(() => Cancha, (cancha) => cancha.id)
  @JoinColumn({ name: 'idCancha' })
  cancha: Cancha;

  @ManyToOne(() => Deportista, (deportista) => deportista.id)
  @JoinColumn({ name: 'idDeportista' })
  deportista: Deportista;
}
