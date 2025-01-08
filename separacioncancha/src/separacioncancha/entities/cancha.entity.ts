import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity()
export class Cancha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 }) 
  descripcion: string;

}
