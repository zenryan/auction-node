import express from 'express';
import fs from 'fs';
import assert from 'assert';
import { ItemImage } from '../entity/item_image';
import { Item } from '../entity/items';
// @ts-ignore
import config = require('../../src/config');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/images/item' });

router.post('/upload', upload.single('picture'), async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { file, body } = req;

    if (!file) throw new Error('Please choose file');

    const item = await Item.findOne({ id: parseInt(body.item_id, 10) });
    assert(item !== undefined, 'Item not found');

    const img = fs.readFileSync(file.path);
    const encode_image = img.toString('base64');

    let image = new ItemImage();
    image.item_id = body.item_id;
    image.uuid = file.filename;
    // TODO: still hardcoded
    image.url = `${config.app.host}/images/item/${file.filename}`;
    await image.save();

    const data = {
      message: "CREATED",
      body: {
        image: {
          url: image.url
        },
      },
    };

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "FILE_UPLOAD_ERROR",
        error_message: `file/upload error`
      }
    });
  }
});

module.exports = router;
