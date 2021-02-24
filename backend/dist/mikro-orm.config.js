"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const constants_1 = require("./constants");
const Portfolio_1 = require("./entities/Portfolio");
const SecurityOverview_1 = require("./entities/SecurityOverview");
const Stock_1 = require("./entities/Stock");
const User_1 = require("./entities/User");
const Watchlist_1 = require("./entities/Watchlist");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [User_1.Users, Stock_1.Stocks, Portfolio_1.Portfolio, Watchlist_1.Watchlist, SecurityOverview_1.securityOverview],
    clientUrl: 'mongodb+srv://shivam:Shivam99@cluster0.ndeux.mongodb.net/isohel?retryWrites=true&w=majority',
    dbName: 'isohel',
    type: 'mongo',
    debug: !constants_1._prod_,
    ensureIndexes: false,
};
//# sourceMappingURL=mikro-orm.config.js.map