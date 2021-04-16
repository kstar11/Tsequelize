import KoaRouter from 'koa-router';
import { Sequelize } from 'sequelize-typescript';
import { Category } from '../schemas/Category';
const router = new KoaRouter();

router.get('/', async (ctx) => {
  const result = await Category.findAndCountAll({
    attributes: ['category_name', 'category_alias', 'category_des'],
    include: [],
    raw: false,
  });
  ctx.body = {
    code: 200,
    message: result,
  };
});

router.post('/', async (ctx) => {
  const result = await Category.upsert(ctx.request.body);
  ctx.body = {
    code: 200,
    message: result,
  };
});

export default router;
