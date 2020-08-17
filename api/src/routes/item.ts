import express from 'express'
const router = express.Router()
import { Item } from '../entity/items';

router.get('/', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const items = await Item.find();
  res.json({
    message: 'GET',
    items,
    pagination: {
      from: 1,
      to: items.length,
      total: 1000,
    }
  });
})

router.post('/create', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { item: reqItem } = req.body;
    const item = new Item();
    item.title = reqItem.title;
    item.desc = reqItem.title;
    item.detail = reqItem.detail;
    item.price = reqItem.price;
    await item.save();

    const data = {
        message: "CREATED",
        body: {
            item,
        },
    };
    res.status(200).json(data);
  } catch (e) {
      console.error(e);
      res.status(500).json({
          message: "ERROR",
          error: {
              code: "ITEM_CREATE_ERROR",
              error_message: `item/create error`
          }
      });
  }
});

module.exports = router;