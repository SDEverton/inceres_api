import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { DistressCall } from './DistressCall';

@Entity('location_history')
class LocationHistory {
  @PrimaryColumn()
  id: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @ManyToOne(() => DistressCall)
  @JoinColumn({ name: 'distress_call_id' })
  user: DistressCall;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { LocationHistory };
