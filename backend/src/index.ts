import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { buildSchema } from 'type-graphql';
import { _prod_ } from './constants';
import microConfig from './mikro-orm.config';
import { userResolver } from './resolvers/users';
import { IsoContext } from './types';
import { stockResolver } from './resolvers/stocks';
import Redis  from 'ioredis'
import { monzoResolver } from './resolvers/monzo';
import { alpacaResolver } from './resolvers/alpaca';

const main = async () => {
    const orm = await MikroORM.init(microConfig)
    const app = express();
    orm.em.getDriver().createCollections()

    const redis = new Redis({
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        family: 4,
        db: 0,
      });
    const MongoStore = require('connect-mongo')(session);
    const mongoose = require('mongoose');
    const connection = mongoose.createConnection('mongodb+srv://shivam:Shivam99@cluster0.ndeux.mongodb.net/isohel?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const slowDown = require("express-slow-down");

    app.enable("trust proxy");
     // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

    const speedLimiter = slowDown({
    windowMs: 1000, // 1 second
    delayAfter: 2, // allow 100 requests per second
    delayMs: 500 // begin adding 500ms of delay per request above 5.
    });

    //  apply to all requests
    app.use(speedLimiter);

    app.use(cors({ //enabling cross origin
        origin: "http://localhost:3000",
        credentials: true
    }));

    app.use(session({//enabling sessions
        proxy: true,
        name: 'qid',
        saveUninitialized: true,
        secret: 'gkaldghdalkgakl',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //max age of cookie is 10 years
            httpOnly: true,
            sameSite: 'lax',
            secure: _prod_,
        },
        store: new MongoStore({ mongooseConnection: connection,//storing sessions
            ttl: 7 * 24 * 60 * 60,
            collection: 'sessions',
        }),
        resave: false, 
    }));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [userResolver, stockResolver, monzoResolver, alpacaResolver],
            validate: false,
        }),
        context: ({req, res}): IsoContext => ({ em: orm.em, req, res, redis: redis})
    });

    apolloServer.applyMiddleware({app, cors: false});

    app.get('/', (req, res) => {
        res.send('Hello World!')
      })

    app.listen(5000, () => {
        console.log('Server listening on port 5000.')
    });
};

main().catch((err) => console.log(err));