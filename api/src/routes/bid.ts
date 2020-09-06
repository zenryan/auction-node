import express from 'express';
import assert from 'assert';
const router = express.Router();
const Not = require('you-are-not');
const not = Not.create();
import { BidPrice } from '../entity/bid_price';
import { AuctionItem } from '../entity/auction_items';
import { Auction } from '../entity/auctions';
import { Item } from '../entity/items';
import { User } from '../entity/users';
import { AuctionMessage } from '../entity/auction_message';
import Message from '../enums/Message';

router.post('/:auctionItemId/', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auctionItemId: reqAuctionItemId } = req.params;
    const { price: reqPrice, user_id: reqUserId } = req.body;

    const auctionItem = await AuctionItem.findOneOrFail({
      id: parseInt(reqAuctionItemId, 10)
    });
    const user = await User.findOneOrFail({ id: parseInt(reqUserId, 10) });
    const auction = await Auction.findOneOrFail({ id: auctionItem.auction_id });
    const item = await Item.findOneOrFail({ id: auctionItem.item_id });

    assert(!Number.isNaN(+reqPrice), 'Invalid price');
    assert(!Number.isNaN(+reqAuctionItemId), 'Invalid item_id');
    assert(+reqPrice > auctionItem.bid_price, 'Bid price is lower than current price');

    const bid = new BidPrice();
    bid.auction_item_id = auctionItem.id;
    bid.user_id = user.id;
    bid.bid_price = +reqPrice;
    bid.previous_price = auctionItem.bid_price || 0;
    await bid.save()

    // update auction item last bid price
    auctionItem.bid_price = bid.bid_price;
    await auctionItem.save();

    // emit message
    const message = new AuctionMessage();
    message.user_id = user.id;
    message.type = Message.BID;
    message.name = 'bid';
    message.message = `${user.name} has bid $${bid.bid_price} for ${item.title}`
    message.auction_id = auction.id;
    message.save();

    const io = (global as any).io;
    await io.to(`auction_${auction.uuid}`)
      .emit('bidMsg', { ...message, price: bid.bid_price })

    res.send({
      message: 'UPDATED',
      body: {
        auction_item: auctionItem,
        bid
      }
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
      error: {
        code: "BID_POST_ERROR",
        error_message: `bid/post error`
      }
    });
  }
});

module.exports = router;