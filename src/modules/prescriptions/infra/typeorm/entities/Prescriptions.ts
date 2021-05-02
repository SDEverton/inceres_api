import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('prescriptions')
class Prescriptions {
  @PrimaryColumn()
  id: string;

  @Column()
  clinic_id: number;

  @Column()
  physician_id: number;

  @Column()
  patient_id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Prescriptions };
