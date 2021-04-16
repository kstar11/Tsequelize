import KoaRouter from 'koa-router';
import UserRouter from './user';
import ArticleRouter from './articles';
import CategoryRouter from './category';
import { sequelize } from '../lib/sequelize';
import { User } from '../schemas/User';
import { Article } from '../schemas/Article';
import { Category } from '../schemas/Category';

const router = new KoaRouter();

// fs.readdir(path.resolve(__dirname, '../schemas'), (err, data) => {
//   if (err) {
//     throw err;
//   }
//   data.forEach((item) => {
//     sequelize.addModels([path.resolve(__dirname, `../schemas/${item}`)]);
//   });
// });

sequelize.addModels([User, Article, Category]);

router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());
router.use('/article', ArticleRouter.routes(), ArticleRouter.allowedMethods());
router.use(
  '/category',
  CategoryRouter.routes(),
  CategoryRouter.allowedMethods(),
);

export default router;
