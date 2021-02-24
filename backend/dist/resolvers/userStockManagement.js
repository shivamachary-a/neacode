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
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolio_watchlist_resolver = void 0;
const Portfolio_1 = require("../entities/Portfolio");
const type_graphql_1 = require("type-graphql");
const Stock_1 = require("../entities/Stock");
const Watchlist_1 = require("../entities/Watchlist");
let portfolio_watchlist_resolver = class portfolio_watchlist_resolver {
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
                currentPortfolio.portfolio.add(stockToAdd);
                em.persistAndFlush(currentPortfolio);
                return true;
            }
            else {
                return false;
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
};
__decorate([
    type_graphql_1.Query(() => [Stock_1.Stocks]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "all", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "addToPortfolio", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "addToWatchlist", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "removeFromWatchlist", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('ticker')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "removeFromPortfolio", null);
__decorate([
    type_graphql_1.Query(() => [String]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "readPortfolio", null);
__decorate([
    type_graphql_1.Query(() => [String]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], portfolio_watchlist_resolver.prototype, "readWatchlist", null);
portfolio_watchlist_resolver = __decorate([
    type_graphql_1.Resolver()
], portfolio_watchlist_resolver);
exports.portfolio_watchlist_resolver = portfolio_watchlist_resolver;
//# sourceMappingURL=userStockManagement.js.map