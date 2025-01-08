import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  identificacion: string;

}
