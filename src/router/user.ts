import KoaRouter from 'koa-router';
import { User } from '../schemas/User';
const router = new KoaRouter();

router.get('/', async (ctx) => {
  const result = await User.findAndCountAll();
  ctx.body = {
    code: 200,
    message: result,
  };
});

router.post('/', async (ctx) => {
  const result = await User.create(ctx.request.body);
  ctx.body = {
    code: 200,
    message: result,
  };
});

router.patch('/:user_id', async (ctx) => {
  const result = await User.update(ctx.request.body, {
    where: {
      user_id: ctx.params.user_id,
    },
  });
  ctx.body = {
    code: 200,
    message: result,
  };
});

router.delete('/:user_id', async (ctx) => {
  const result = await User.destroy({
    where: {
      user_id: ctx.params.user_id,
    },
  });
  ctx.body = {
    code: 200,
    message: result,
  };
});

export default router;
