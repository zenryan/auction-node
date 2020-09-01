import { AuctionMessage } from './entity/auction_message';
import { User } from './entity/users';
import { Auction } from './entity/auctions';


/**
 * socket.io
 */
module.exports = function (server: any) {
  const io = require('socket.io')(server);
  io.on('connection', (socket: any) => {
    socket = socket;
    console.log('[ws] User connected');

    socket.on('disconnect', () => {
      console.log('[ws] User disconnect');
    });

    // generic message
    socket.on('message', (body: any) => {
      console.log('message', body);
      socket.broadcast.emit('message', body);
    });

    socket.on('roomJoin', (body: any) => {
      console.log('roomJoin', body);
      const { uuid } = body;

      socket.join(`auction_${uuid}`, async () => {

        const message = new AuctionMessage();
        // TODO: change this to get from jwt
        const user = await User.findOneOrFail({ id: body.user.id });
        const auction = await Auction.findOneOrFail({ uuid: body.uuid });
        message.auction_id = auction.id;
        message.message = `${user.name} has joined`;
        message.name = 'system';
        await message.save();

        socket.broadcast
          .to(`auction_${uuid}`)
          .emit('roomMsg', message);
      });
    });

    socket.on('roomLeave', (body: any) => {
      console.log('roomLeave', body);
      const { type, uuid, user } = body;

      socket.leave(`auction_${uuid}`, async () => {

        const message = new AuctionMessage();
        // TODO: change this to get from jwt
        const user = await User.findOneOrFail({ id: body.user.id });
        const auction = await Auction.findOneOrFail({ uuid: body.uuid });
        message.auction_id = auction.id;
        message.message = `${user.name} has left`;
        message.name = 'system';
        await message.save();

        socket.broadcast
          .to(`auction_${uuid}`)
          .emit('roomMsg', message);
      });
    });

    socket.on('roomMsg', async (body: any) => {
      try {
        // save msg in db
        const message = new AuctionMessage();
        // TODO: change this to get from jwt
        const user = await User.findOneOrFail({ id: body.user.id });
        const auction = await Auction.findOneOrFail({ uuid: body.uuid });
        message.auction_id = auction.id;
        message.message = body.message;
        message.user_id = user.id;
        message.name = user.name;
        await message.save();

        console.log('[emit] roomMsg', `auction_${body.uuid}`, message);
        io.to(`auction_${body.uuid}`).emit('roomMsg', message);
      } catch (e) {
        console.error(e)
      }
    });
  });
};
