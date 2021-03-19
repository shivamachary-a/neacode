"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const users_1 = require("./resolvers/users");
const stocks_1 = require("./resolvers/stocks");
const monzo_1 = require("./resolvers/monzo");
const alpaca_1 = require("./resolvers/alpaca");
const axios_1 = __importDefault(require("axios"));
const Asset_1 = require("./entities/Asset");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    const schedule = require('node-schedule');
    const app = express_1.default();
    orm.em.getDriver().createCollections();
    const MongoStore = require('connect-mongo')(express_session_1.default);
    const mongoose = require('mongoose');
    const connection = mongoose.createConnection('mongodb+srv://shivam:Shivam99@cluster0.ndeux.mongodb.net/isohel?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const slowDown = require("express-slow-down");
    app.enable("trust proxy");
    const speedLimiter = slowDown({
        windowMs: 1000,
        delayAfter: 2,
        delayMs: 500
    });
    app.use(speedLimiter);
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true
    }));
    app.use(express_session_1.default({
        proxy: true,
        name: 'qid',
        saveUninitialized: true,
        secret: 'gkaldghdalkgakl',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1._prod_,
        },
        store: new MongoStore({
            mongooseConnection: connection,
            ttl: 7 * 24 * 60 * 60,
            collection: 'sessions',
        }),
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [users_1.userResolver, stocks_1.stockResolver, monzo_1.monzoResolver, alpaca_1.alpacaResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    schedule.scheduleJob('30 * * * *', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get("https://paper-api.alpaca.markets/v2/assets", {
                headers: {
                    "APCA-API-KEY-ID": "PKGZOZFKBCT9CK5VEUMK",
                    "APCA-API-SECRET-KEY": "6LYLnFqBRAd83Ldv0cyQxYopCnc8GqZWkctvLdbH"
                }
            });
            for (var asset of response.data) {
                try {
                    orm.em.nativeInsert(Asset_1.Asset, {
                        class: asset.class,
                        exchange: asset.exchange,
                        symbol: asset.symbol,
                        name: asset.name,
                        name_lower: asset.name.toLowerCase(),
                        tradable: asset.tradable,
                        marginable: asset.marginable,
                        shortable: asset.shortable,
                        easy_to_borrow: asset.easy_to_borrow
                    });
                }
                catch (err) {
                    if (err.toString().includes('duplicate')) {
                        continue;
                    }
                }
            }
        });
    });
    app.listen(5000, () => {
        console.log('Server listening on port 5000.');
    });
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map