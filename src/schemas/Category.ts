import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { Article } from './Article';

export interface CategoryModel {
  category_id: number;
  category_name: string;
  category_alias: string;
  category_des: string;
}

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'blog_category',
})
export class Category extends Model<CategoryModel> {
  @ForeignKey(()=>Article)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  category_id!: number;

  @Column
  category_name: string;

  @Column
  category_alias: string;

  @Column
  category_des: string;

  @BelongsTo(() => Article, 'category_id')
  article: Article;
}
