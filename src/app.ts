import Koa from 'koa';
import KoaBody from 'koa-body';
import KoaCors from '@koa/cors';
import path from 'path';
import router from './router/index';
import Static from 'koa-static';

const app = new Koa();
app.use(
  KoaBody({
    multipart: true,
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'),
      keepExtensions: true,
      maxFieldsSize: 2 * 1024 * 1024,
      onFileBegin: (name, file) => {},
    },
  }),
);
app.use(Static(path.resolve(__dirname, '../public')));
app.use(KoaCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () =>
  console.info(`Serve is running on http://localhost:3000`),
);
