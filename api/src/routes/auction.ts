import express from 'express'
const router = express.Router()
const Not = require('you-are-not')
const not = Not.create()
import { Auction } from '../entity/auctions';
import cors from 'cors';

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

router.post('/create', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { auction: reqAuction } = req.body;
    const auction = new Auction();
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

module.exports = router;