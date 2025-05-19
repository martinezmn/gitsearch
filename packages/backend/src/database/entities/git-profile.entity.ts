import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class GitProfile {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('int')
  gitId: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column('int')
  followers: number;

  @Column('timestamp')
  lastFetchAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
