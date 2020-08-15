import express from 'express'
const router = express.Router()
const Not = require('you-are-not')
const not = Not.create()
import { User } from '../entity/users';

router.get('/', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // example how to remove AR entity
  // await user.remove();

  // example how to load AR entities
  const users = await User.find();
  // const newUsers = await User.find({ isActive: true });
  // const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });
  res.send(users);
})

router.put('/add', async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {

  not('string', req.body.username, 'User Name', 'Please check your entry');
  not('string', req.body.name, 'Name', 'Please check your entry');

  // perform tasks here
  // example how to save AR entity
  const user = new User();
  user.username = req.body.username;
  user.name = req.body.name;
  await user.save();

  res.send({user});
})

module.exports = router
