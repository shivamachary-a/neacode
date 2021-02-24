"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.stockResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const graphql_type_json_1 = require("graphql-type-json");
const SecurityOverview_1 = require("../entities/SecurityOverview");
const type_graphql_1 = require("type-graphql");
const Portfolio_1 = require("../entities/Portfolio");
const Stock_1 = require("../entities/Stock");
const User_1 = require("../entities/User");
const Watchlist_1 = require("../entities/Watchlist");
const types_1 = require("../types");
let stockResolver = class stockResolver {
    all({ em }) {
        return __awaiter(this, void 0, void 0, function* () {
            return em.find(Stock_1.Stocks, {});
        });
    }
    addToPortfolio(ticker, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPortfolio = yield em.findOne(Portfolio_1.Portfolio, { id: req.session.userID });
            const stockToAdd = yield em.findOne(Stock_1.Stocks, { symbol: ticker });
            if (currentPortfolio && stockToAdd) {
                try {
                    currentPortfolio.portfolio.add(stockToAdd);
                    em.persistAndFlush(currentPortfolio);
                    return {
                        error: [],
                        stock: stockToAdd
                    };
                }
                catch (e) {
                    return {
                        error: [
                            {
                                field: '',
                                message: e.toString()
                            }
                        ]
                    };
                }
            }
            else {
                return {
                    error: [{
                            field: "Stock/User",
                            message: "Either the stock does not exist, or the user does not exist."
                        }]
                };
            }
        });
    }
    addToWatchlist(ticker, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentWatchlist = yield em.findOne(Watchlist_1.Watchlist, { id: req.session.userID });
            const stockToAdd = yield em.findOne(Stock_1.Stocks, { symbol: ticker });
            if (currentWatchlist && stockToAdd) {
                currentWatchlist.watchlist.add(stockToAdd);
                em.persistAndFlush(currentWatchlist);
                return true;
            }
            else {
                return false;
            }
        });
    }
    removeFromWatchlist(ticker, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentWatchlist = yield em.findOne(Watchlist_1.Watchlist, { id: req.session.userID });
            const stockToRemove = yield em.findOne(Stock_1.Stocks, { symbol: ticker });
            if (currentWatchlist && stockToRemove) {
                currentWatchlist.watchlist.remove(stockToRemove);
                em.persistAndFlush(currentWatchlist);
                return true;
            }
            else {
                return false;
            }
        });
    }
    removeFromPortfolio(ticker, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPortfolio = yield em.findOne(Portfolio_1.Portfolio, { id: req.session.userID });
            const stockToRemove = yield em.findOne(Stock_1.Stocks, { symbol: ticker });
            if (currentPortfolio && stockToRemove) {
                currentPortfolio.portfolio.remove(stockToRemove);
                em.persistAndFlush(currentPortfolio);
                return true;
            }
            else {
                return false;
            }
        });
    }
    readPortfolio({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            var tickers = [];
            const currentPortfolio = yield em.findOne(Portfolio_1.Portfolio, { id: req.session.userID });
            const instrinsicPortfolio = currentPortfolio === null || currentPortfolio === void 0 ? void 0 : currentPortfolio.portfolio;
            for (const stockObject of instrinsicPortfolio) {
                const ticker = yield (em.findOne(Stock_1.Stocks, { id: stockObject.id }));
                tickers.push(ticker === null || ticker === void 0 ? void 0 : ticker.symbol);
            }
            return tickers;
        });
    }
    readWatchlist({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            var tickers = [];
            const currentWatchlist = yield em.findOne(Watchlist_1.Watchlist, { id: req.session.userID });
            const instrinsicWatchlist = currentWatchlist === null || currentWatchlist === void 0 ? void 0 : currentWatchlist.watchlist;
            for (const stockObject of instrinsicWatchlist) {
                const ticker = yield (em.findOne(Stock_1.Stocks, { id: stockObject.id }));
                tickers.push(ticker === null || ticker === void 0 ? void 0 : ticker.symbol);
            }
            return tickers;
        });
    }
    overview(ticker, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkForOverview = yield em.findOne(SecurityOverview_1.securityOverview, { symbol: ticker.toUpperCase() });
            if (!checkForOverview) {
                console.log("Overview not found");
                const response = yield axios_1.default.get(`https://api.polygon.io/v1/meta/symbols/${ticker.toUpperCase()}/company?&apiKey=Mr8kP5Aowd0r3A0OTj9H6fonc8_yAbdN`);
                const newOverview = em.create(SecurityOverview_1.securityOverview, {
                    symbol: response.data.symbol,
                    name: response.data.name,
                    description: response.data.description,
                    exchange: response.data.exchange,
                    industry: response.data.industry,
                    sector: response.data.sector,
                });
                try {
                    yield em.persistAndFlush(newOverview);
                }
                catch (e) {
                    console.log(e);
                }
                ;
                return [newOverview];
            }
            else {
                return [checkForOverview];
            }
        });
    }
    searchEquities(symbol, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    error: [{
                            field: "User",
                            message: "Request not authorised. Please log in."
                        }]
                };
            }
            else {
                try {
                    const response = yield axios_1.default.get(`https://sandbox.iexapis.com/stable/search/${symbol.toLowerCase()}?token=Tsk_12a652ebe24b4421a3401e1a649f418c`);
                    console.log(response.data);
                    return {
                        error: [],
                        results: response.data
                    };
                }
                catch (e) {
                    return {
                        error: [{
                                field: "",
                                message: e.toString()
                            }]
                    };
                }
            }
        });
    }
    newsQuery({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            var stocks = [];
            const response = [];
            const user = em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return 'User not authorised';
            }
            else {
                const portfolio = yield em.findOne(Portfolio_1.Portfolio, { id: req.session.userID });
                if ((portfolio === null || portfolio === void 0 ? void 0 : portfolio.portfolio.length) === 0) {
                    const starter = [
                        {
                            "datetime": 1545215400000,
                            "headline": "add some stocks to your watchlist to get relevant news!",
                            "source": "isohel.co.uk",
                            "url": "isohel.co.uk",
                            "summary": "isohel sources news related to the things you're interested in.",
                            "related": "AAPL,AMZN,GOOG,GOOGL,MSFT",
                            "image": "https://cloud.iexapis.com/stable/news/image/7594023985414148",
                            "lang": "en",
                            "hasPaywall": true,
                        },
                        {
                            "datetime": 1545215400000,
                            "headline": "add some stocks to your watchlist to get relevant news!",
                            "source": "isohel.co.uk",
                            "url": "isohel.co.uk",
                            "summary": "isohel sources news related to the things you're interested in.",
                            "related": "AAPL,AMZN,GOOG,GOOGL,MSFT",
                            "image": "https://cloud.iexapis.com/stable/news/image/7594023985414148",
                            "lang": "en",
                            "hasPaywall": true,
                        },
                    ];
                    response.push(starter);
                    return { response };
                }
                for (const stock of portfolio.portfolio) {
                    const ticker = yield em.findOne(Stock_1.Stocks, { id: stock.id });
                    stocks.push(ticker.symbol);
                }
                for (const ticker of stocks) {
                    const newsResponse = yield axios_1.default.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/news?token=Tsk_12a652ebe24b4421a3401e1a649f418c`);
                    response.push(newsResponse.data);
                }
                return { response };
            }
        });
    }
    getPrice(ticker) {
        return __awaiter(this, void 0, void 0, function* () {
            const price = yield axios_1.default.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_5944510d86bc4c12a137145ee3239b62`);
            return price.data;
        });
    }
    sectorPerformance() {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield axios_1.default.get('https://sandbox.iexapis.com/stable/stock/market/sector-performance?token=Tpk_8b82ce782a7b4219a1e2108596c7bace');
            const response = sectors.data;
            return { response };
        });
    }
    topPerformers() {
        return __awaiter(this, void 0, void 0, function* () {
            const gainers = yield axios_1.default.get('https://sandbox.iexapis.com/stable/stock/market/list/gainers?token=Tsk_6e697feab5e2495b9ab715ada8e5e51c');
            const response = gainers.data;
            return { response };
        });
    }
    topLosers() {
        return __awaiter(this, void 0, void 0, function* () {
            const losers = yield axios_1.default.get('https://sandbox.iexapis.com/stable/stock/market/list/losers?token=Tpk_8cd345358a514a7b9e78dfa602a4fa41');
            const response = losers.data;
            return { response };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Stock_1.Stocks]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "all", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.StockResponse),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "addToPortfolio", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "addToWatchlist", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "removeFromWatchlist", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "removeFromPortfolio", null);
__decorate([
    type_graphql_1.Query(() => [String]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "readPortfolio", null);
__decorate([
    type_graphql_1.Query(() => [String]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "readWatchlist", null);
__decorate([
    type_graphql_1.Query(() => [SecurityOverview_1.securityOverview]),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "overview", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.SearchResponse),
    __param(0, type_graphql_1.Arg("symbol")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "searchEquities", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "newsQuery", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Arg('ticker')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "getPrice", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "sectorPerformance", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "topPerformers", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "topLosers", null);
stockResolver = __decorate([
    type_graphql_1.Resolver()
], stockResolver);
exports.stockResolver = stockResolver;
//# sourceMappingURL=stocks.js.map