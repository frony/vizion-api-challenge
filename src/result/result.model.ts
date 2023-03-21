import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';

import { Reference } from '../reference/reference.model';

@Table({
  tableName: 'result',
})
export class Result extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Reference)
  @Column(DataType.INTEGER)
  reference_id: number;

  @Column(DataType.JSON)
  data: {
    title: string;
    meta: [
      {
        name: string;
        value: string;
      },
    ];
  };

  @CreatedAt
  @Column(DataType.TIME)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: Date;
}
