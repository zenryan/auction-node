import express from 'express'
const router = express.Router()
import assert from 'assert';
import { Item } from '../entity/items';
import { Status } from '../entity/enum';
const multer = require('multer');
const upload = multer({ dest: 'src/public/images/item' });
// @ts-ignore
import config = require('../../src/config');


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
});

router.get('/search', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { q } = req.query;
    const items = await Item.searchbyText(q);
    res.json(items);
  } catch (e) {
    console.error(e);
  }

});

router.get('/:itemId', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { itemId } = req.params;

    const item = await Item.findOne({ id: parseInt(itemId, 10) });
    assert(item !== undefined, 'Item not found');

    res.json({
      message: 'GET',
      item,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "ITEM_GET_ERROR",
        error_message: `item/get error`
      }
    });
  }
});

router.post('/avatar', upload.single('picture'), async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { file, body } = req;

    if (!file) throw new Error('Please choose file');

    const item = await Item.findOne({ id: parseInt(body.item_id, 10) });
    assert(item !== undefined, 'Item not found');

    item.avatar = `${config.app.host}/images/item/${file.filename}`;
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
        code: "ITEM_AVATAR_ERROR",
        error_message: `item/avatar error`
      }
    });
  }
});

router.post('/create', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { item: reqItem } = req.body;
    const item = new Item();
    if (reqItem.id) item.id = reqItem.id;
    item.title = reqItem.title;
    item.desc = reqItem.desc;
    item.detail = reqItem.detail;
    item.price = reqItem.price;
    item.status = Status.active;
    item.avatar = reqItem.avatar;
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
