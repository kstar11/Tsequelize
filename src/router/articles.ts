import KoaRouter from 'koa-router';
import { Sequelize } from 'sequelize-typescript';
import { Article } from '../schemas/Article';
import { User } from '../schemas/User';
import { Category } from '../schemas/Category';
const router = new KoaRouter();

router.get('/', async (ctx) => {
  const { pageIndex, pageSize }: any = ctx.query;
  const offset: number | any = (pageIndex - 1) * pageSize;
  const result = await Article.findAndCountAll({
    attributes: [
      'article_title',
      'article_content',
      'article_views',
      'article_comment_count',
      'article_like_count',
      'article_date',
      'article_category',
      'article_tags',
      [Sequelize.col('category.category_name'), 'category_name'],
    ],
    limit: Number(pageSize),
    offset: offset,
    include: [
      {
        model: Category,
        attributes: [],
        where: {},
      },
    ],
    raw: false,
    where: {},
  });
  ctx.body = {
    code: 200,
    message: result,
  };
});

router.post('/', async (ctx) => {
  const result = await Article.upsert(ctx.request.body);
  ctx.body = {
    code: 200,
    message: result,
  };
});

export default router;
