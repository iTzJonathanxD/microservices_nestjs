import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('encuestas')
export class Encuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  detallesEncuesta?: string;

}
