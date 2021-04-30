import {
  Model,
  Table,
  DataType,
  Column,
  HasOne,
  PrimaryKey,
} from 'sequelize-typescript';
import dayjs from 'dayjs';
import { User } from './User';
import { Category } from './Category';

export interface ArticleModel {
  article_id: number;
  article_title: string;
  article_content: string;
  article_views: number;
  article_comment_count: number;
  article_date: Date;
  article_like_count: number;
  article_category: number;
  article_tags: string;
}

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'blog_articles',
})
export class Article extends Model<ArticleModel> {
  @PrimaryKey
  @Column
  article_id: number;

  @Column
  article_title: string;

  @Column
  article_content: string;

  @Column({ defaultValue: 0 })
  article_views: string;

  @Column({ defaultValue: 0 })
  article_comment_count: string;

  @Column({ defaultValue: 0 })
  article_like_count: string;

  @Column({
    type: DataType.DATE,
    defaultValue: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  article_date: Date;

  @Column
  article_category: number;

  @Column
  article_tags: string;

  @HasOne(() => Category, 'category_id')
  category: Category;
}
