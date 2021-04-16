import {
  Model,
  Table,
  DataType,
  Column,
  Unique,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import dayjs from 'dayjs';
import { Article } from './Article';
dayjs.locale('zh-cn');

export interface UserModel {
  user_id: number;
  user_name: string;
  user_password: string;
  user_email: string;
  user_avatar: string;
  user_nickname: string;
  user_registration_time: Date;
  user_isAdmin: number;
}

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'blog_users',
  modelName: 'User',
})
export class User extends Model<UserModel> {
  @PrimaryKey
  @ForeignKey(() => Article)
  @Column
  user_id: number;

  @BelongsTo(() => Article, 'user_id')
  article: Article;

  @Unique
  @Column({
    primaryKey: true,
  })
  user_name: string;

  @Column
  user_password: string;

  @Column
  user_email: string;

  @Column
  user_avatar: string;

  @Column
  user_nickname: string;

  @Column({
    type: DataType.DATE,
    defaultValue: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  user_registration_time: Date;

  @Column({ type: DataType.INET, defaultValue: 0 })
  user_isAdmin: number;
}
