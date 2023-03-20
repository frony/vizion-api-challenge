import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  Unique,
  PrimaryKey,
  DataType,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';

import { Result } from '../result/result.model';

@Table({
  tableName: 'reference',
})
export class Reference extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  url: string;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: Date;

  @HasMany(() => Result)
  results: Result[];
}
