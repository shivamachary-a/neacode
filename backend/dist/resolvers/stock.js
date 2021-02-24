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
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const Stock_1 = require("../entities/Stock");
const User_1 = require("../entities/User");
let stockResolver = class stockResolver {
    allStocks({ em }) {
        return em.find(Stock_1.Stocks, {});
    }
    oneStock(ticker, { em }) {
        return em.findOne(Stock_1.Stocks, { symbol: ticker });
    }
    stockFromID(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            return em.findOne(Stock_1.Stocks, { id: id });
        });
    }
    stockSearch(ticker, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield em.find(Stock_1.Stocks, { symbol: { $re: ticker } });
            console.log(result);
            return result;
        });
    }
    sectorPerformance() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = yield axios_1.default.get(constants_1.IEX_PREFIX + 'iexapis.com/stable/stock/market/sector-performance?token=' + constants_1.IEX_TOKEN);
            const promiseData = promise.data;
            return { promiseData };
        });
    }
    stockOverview(ticker) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = yield axios_1.default.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + ticker + '&apikey=' + constants_1.AV_TOKEN);
            const data = promise.data;
            return { data };
        });
    }
    stockNews({ em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            var tickers = [];
            if (!user) {
                return {
                    error: {
                        field: "user",
                        message: "user portfolio not found."
                    }
                };
            }
            for (const stock of user.portfolio) {
                const intrinsicStock = yield em.findOne(Stock_1.Stocks, { id: stock.id });
                console.log(intrinsicStock === null || intrinsicStock === void 0 ? void 0 : intrinsicStock.companyName);
                tickers.push(intrinsicStock === null || intrinsicStock === void 0 ? void 0 : intrinsicStock.symbol);
            }
            var newsObjects = [];
            for (const ticker of tickers) {
                const promise = yield axios_1.default.get(constants_1.IEX_PREFIX + 'iexapis.com/stable/stock/' + ticker + '/news?token=' + constants_1.IEX_TOKEN);
                const dataPromise = promise.data;
                newsObjects.push(dataPromise);
            }
            console.log(newsObjects);
            return { newsObjects };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Stock_1.Stocks]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], stockResolver.prototype, "allStocks", null);
__decorate([
    type_graphql_1.Query(() => Stock_1.Stocks, { nullable: true }),
    __param(0, type_graphql_1.Arg("ticker", () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "oneStock", null);
__decorate([
    type_graphql_1.Query(() => Stock_1.Stocks, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "stockFromID", null);
__decorate([
    type_graphql_1.Mutation(() => [Stock_1.Stocks]),
    __param(0, type_graphql_1.Arg("ticker")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "stockSearch", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "sectorPerformance", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Arg("ticker")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "stockOverview", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], stockResolver.prototype, "stockNews", null);
stockResolver = __decorate([
    type_graphql_1.Resolver()
], stockResolver);
exports.stockResolver = stockResolver;
//# sourceMappingURL=stock.js.map