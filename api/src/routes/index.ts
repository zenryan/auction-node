import express from 'express'
import { createQueryBuilder } from 'typeorm';
const router = express.Router();

/* GET home page. */
router.get('/', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {

  res.render('index', { title: 'Express with type' });
});

router.post('/login', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const user = await createQueryBuilder('user')
    .orderBy('RAND()')
    .getOne();

  res.json({
    message: 'AUTHENTICATION',
    body: {
      user,
    },
  });
});

module.exports = router;
