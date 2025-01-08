import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Deportista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  identificacion: string;

  @Column()
  equipo: string;
}
