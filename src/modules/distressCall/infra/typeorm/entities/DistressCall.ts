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

import { User } from '@modules/users/infra/typeorm/entities/User';

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
