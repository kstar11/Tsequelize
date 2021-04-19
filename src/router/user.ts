import KoaRouter from 'koa-router';
import jwtSimple from 'jwt-simple';
import { User } from '../schemas/User';
import config from '../../config/config';

const router = new KoaRouter();
const jwtSecret = config.secretKey;
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7;

router.get('/', async (ctx) => {
  const result = await User.findAndCountAll();
  ctx.body = {
    code: 200,
    message: result,
  };
});

router.post('/login', async (ctx) => {
  const {
    body: { user_name, user_password },
  } = ctx.request;
  let result = await User.findOne({
    where: {
      user_name: user_name,
      user_password: user_password,
    },
  });
  if (!result) {
    ctx.body = {
      code: 400,
      message: '用户名或密码错误',
      data: null,
    };
    return;
  }
  const payload = {
    exp: Date.now() + tokenExpiresTime,
    name: ctx.request.body.username,
  };
  const token = jwtSimple.encode(payload, jwtSecret);
  ctx.body = {
    code: 200,
    message: '欢迎回来',
    data: token,
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
