import { Expose } from 'class-transformer';
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

@Entity('notes')
class Notes {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  file: string;

  @Column()
  type_file: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'file_url' })
  file_url(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/file/${this.file}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/file/${this.file}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Notes };
