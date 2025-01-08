import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from './paciente.entity';
import { TipoExamen } from './tipoexaman.entity';

@Entity('resultados')
export class Resultado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPaciente: number;

  @Column()
  idTipoExamen: number;

  @Column()
  resultado: string;

  @Column('float')
  valorPagado: number;

  @Column({ nullable: true })
  observaciones: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.id)
  @JoinColumn({ name: 'idPaciente' })
  paciente: Paciente;

  @ManyToOne(() => TipoExamen, (tipoExamen) => tipoExamen.id)
  @JoinColumn({ name: 'idTipoExamen' })
  tipoExamen: TipoExamen;
}
