import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import 'reflect-metadata';
import { _prod_ } from "./constants";
import { Asset } from './entities/Asset';
import { Portfolio } from './entities/Portfolio';
import { securityOverview } from './entities/SecurityOverview';
import { Stocks } from './entities/Stock';
import { Transactions } from './entities/Transaction';
import { Users } from "./entities/User";
import { Watchlist } from './entities/Watchlist';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Users, Stocks, Portfolio, Watchlist, securityOverview, Transactions, Asset],
  clientUrl: 'mongodb+srv://shivam:Shivam99@cluster0.ndeux.mongodb.net/isohel?retryWrites=true&w=majority',
  dbName: 'isohel',
  type: 'mongo',
  debug: !_prod_,
  ensureIndexes: false,


} as Parameters<typeof MikroORM.init>[0];