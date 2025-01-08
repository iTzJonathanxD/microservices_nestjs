import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Persona } from './persona.entity';
import { Encuesta } from './encuesta.entity';

@Entity('registros')
export class Registro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Persona, (persona) => persona.id, { nullable: false })
  @JoinColumn({ name: 'idPersona' })
  persona: Persona;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.id, { nullable: false })
  @JoinColumn({ name: 'idEncuesta' })
  encuesta: Encuesta;

  @Column()
  fecha: String;

  @Column()
  hora: String;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ubicacion?: string;
}
