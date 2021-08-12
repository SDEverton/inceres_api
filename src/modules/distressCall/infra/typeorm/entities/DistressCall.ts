import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { LocationHistory } from './LocationHistory';

@Entity('distress_call')
class DistressCall {
  @PrimaryColumn()
  id: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @Column()
  user_id: string;

  @Column()
  activid: boolean;

  @Column()
  token_channel: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => LocationHistory,
    (locationHistory) => locationHistory.distressCall
  )
  // @JoinColumn({ name: 'id', referencedColumnName: 'distress_call_id' })
  locationHistory: LocationHistory[];

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

export { DistressCall };
