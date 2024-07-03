import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LeaguesStatistics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'total_leagues',
    type: 'integer',
  })
  totalLeagues: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
