import express from 'express';
import assert from 'assert';
const router = express.Router();
const Not = require('you-are-not');
const not = Not.create();
import { Auction } from '../entity/auctions';
import { Item } from '../entity/items';
import { User } from '../entity/users';
import { AuctionItem } from '../entity/auction_items';
import { AuctionMessage } from '../entity/auction_message';
import { AuctionUser } from '../entity/auction_user';
import { Status } from '../entity/enum';
import { createQueryBuilder } from 'typeorm';

router.get('/', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const auctions = await Auction.find();
  res.send({
    message: 'GET',
    auctions,
    pagination: {
      from: 1,
      to: auctions.length,
      total: 1000,
    }
  });
});

router.get('/:auctionId', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findOne({ id: parseInt(auctionId, 10) });
    assert(auction !== undefined, 'Error: Auction not found');

    res.send({
      message: 'GET',
      auction,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_GET_ERROR",
        error_message: `auction/get error`
      }
    });
  }
});

router.get('/:auctionId/messages', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId } = req.params;

    const messages = await AuctionMessage.getMessages(
      parseInt(auctionId, 10)
    );

    res.send({
      message: 'GET',
      auctionId,
      messages
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_GET_MESSAGE_ERROR",
        error_message: `auction/get message error`
      }
    });
  }
});

router.post('/:auctionId/message', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId } = req.params;
    const { body } = req;

    const message = new AuctionMessage();
    // TODO: change this to get from jwt
    const user = await User.findOneOrFail(body.user_id);
    message.auction_id = parseInt(auctionId, 10);
    message.message = body.message;
    message.user_id = body.user_id;
    message.name = user.name;
    message.save();

    res.send({
      message: 'CREATED',
      body: {
        auctionId,
        message: message,
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_GET_MESSAGE_ERROR",
        error_message: `auction/get message error`
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
    const { auction: reqAuction } = req.body;
    const auction = new Auction();

    if (reqAuction.id) auction.id = reqAuction.id;
    auction.title = reqAuction.title;
    auction.desc = reqAuction.desc;
    auction.startprice = reqAuction.startprice;
    auction.detail = reqAuction.detail;
    auction.startdate = reqAuction.startdate;
    auction.enddate = reqAuction.enddate;
    await auction.save();

    const data = {
      message: "CREATED",
      body: {
        auction,
      },
    };
    res.status(200).json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_CREATE_ERROR",
        error_message: `auction/create error`
      }
    });
  }
});

router.get('/:auctionId/item', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId } = req.params;

    const result = await createQueryBuilder('auction_item')
      .leftJoinAndSelect(Item, 'Item', 'Item.id = `AuctionItem`.`item_id`')
      .where('AuctionItem.auction_id = :id', { id: `${auctionId}` })
      .getRawMany();

    const data = {
      message: "LISTED",
      items: result.map((i) => {
        return {
          id: i.Item_id,
          title: i.Item_title,
          desc: i.Item_desc,
          detail: i.Item_detail,
          price: i.Item_price,
          status: i.Item_status,
          created_at: i.Item_created_at,
          updated_at: i.Item_updated_at,
        }
      }),
    };
    res.status(200).json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_ITEM_ERROR",
        error_message: `Get auctionItem error`
      }
    });
  }
});

router.post('/:auctionId/item/:itemId', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId, itemId } = req.params;

    const item = await Item.findOne({ id: parseInt(itemId, 10) });
    assert(item !== undefined, 'Error: Item not found');

    let auctionItem = new AuctionItem();
    auctionItem.auction_id = parseInt(auctionId, 10);
    auctionItem.item_id = parseInt(itemId, 10);
    auctionItem.startingprice = 100;
    auctionItem.status = Status.active;
    auctionItem.save();

    item.status = Status.forAuction;
    item.save();

    const data = {
      message: "CREATED",
      item
    };
    res.status(200).json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_ITEM_CREATE_ERROR",
        error_message: `Adding auctionItem error`
      }
    });
  }
});

router.delete('/:auctionId/item/:itemId', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId, itemId } = req.params;

    const item = await Item.findOne({ id: parseInt(itemId, 10) });
    assert(item !== undefined, 'Error: Item not found');

    const result = await AuctionItem.deleteByAuctionAndItemId(
      parseInt(auctionId, 10),
      parseInt(itemId, 10)
    );

    item.status = Status.active;
    item.save();

    const data = {
      message: "DELETED",
      affected: result.affected,
    };
    res.status(200).json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_ITEM_DELETE_ERROR",
        error_message: `Delete auctionItem error`
      }
    });
  }
});

router.get('/:auctionId/users', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionId } = req.params;

    const auctionUsers = await AuctionUser.find({ auction_id: parseInt(auctionId, 10) });
    assert(auctionUsers !== undefined, 'Error: Item not found');
    const users = auctionUsers.map((auctionUser) => {
      return {
        id: auctionUser.user_id,
        name: auctionUser.name,
      };
    })
    const data = {
      message: "GET",
      auction_users: users,
    };
    res.status(200).json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "AUCTION_USER_GET_ERROR",
        error_message: `Getting auctionUser error`
      }
    });
  }
});

module.exports = router;