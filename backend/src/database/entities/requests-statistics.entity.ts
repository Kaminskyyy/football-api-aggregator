import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestsStatistics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Values of this column must of the next format:
  // METHOD_url
  // for example:
  // GET_/football/statistics
  @Column({ type: 'text', unique: true })
  endpoint: string;

  @Column({ type: 'integer', default: 0, name: 'count_successful' })
  countSuccessful: number;

  @Column({ type: 'integer', default: 0, name: 'count_failed' })
  countFailed: number;
}
