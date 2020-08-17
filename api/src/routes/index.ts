import express from 'express'
const router = express.Router();

/* GET home page. */
router.get('/', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {

  res.render('index', { title: 'Express with type' });
});

module.exports = router;
