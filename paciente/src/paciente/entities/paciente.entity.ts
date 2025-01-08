import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  identificacion: string;

}
