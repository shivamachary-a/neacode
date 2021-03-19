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
exports.alpacaResolver = void 0;
const User_1 = require("../entities/User");
const types_1 = require("../types");
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const axios_1 = __importDefault(require("axios"));
const graphql_type_json_1 = require("graphql-type-json");
const Asset_1 = require("../entities/Asset");
let alpacaResolver = class alpacaResolver {
    getAlpacaRedirect({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return "Error: user doesn't exist";
            }
            else {
                return `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${constants_1.alpaca_client_id}&redirect_uri=http://isohel.co.uk/redirect/alpaca&state=${user.id}&scope=account:write%20trading%20data`;
            }
        });
    }
    placeOrder({ req, em }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            const response = yield axios_1.default.post("https://paper-api.alpaca.markets/v2/orders", options, {
                headers: {
                    "Authorization": `Bearer ${user.alpacaToken}`
                },
            });
            return response.data;
        });
    }
    getAlpacaAccount({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                const response = yield axios_1.default.get("https://api.alpaca.markets/v2/account", {
                    headers: {
                        "Authorization": `Bearer ${user.alpacaToken}`
                    }
                });
                return response.data;
            }
        });
    }
    getAlpacaAccountPaper({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                const response = yield axios_1.default.get("https://paper-api.alpaca.markets/v2/account", {
                    headers: {
                        "Authorization": `Bearer ${user.alpacaToken}`
                    }
                });
                return response.data;
            }
        });
    }
    searchAssets({ req, em }, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                try {
                    const searchResults = yield em.find(Asset_1.Asset, { name_lower: { $re: symbol.toLowerCase() } });
                    return searchResults;
                }
                catch (e) {
                    return { error: e };
                }
            }
        });
    }
    getAlpacaPositionsPaper({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                const response = yield axios_1.default.get("https://paper-api.alpaca.markets/v2/positions", {
                    headers: {
                        "Authorization": `Bearer ${user.alpacaToken}`
                    }
                });
                return {
                    response: response.data
                };
            }
        });
    }
    getPortfolioHistoryPaper({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                const response = yield axios_1.default.get("https://paper-api.alpaca.markets/v2/account/portfolio/history", {
                    headers: {
                        "Authorization": `Bearer ${user.alpacaToken}`
                    }
                });
                var graphingData = [];
                for (let i = 0; i < response.data.timestamp.length; i++) {
                    graphingData.push([response.data.timestamp[i], response.data.equity[i]]);
                }
                var equities = response.data.equity;
                var timestamps = response.data.timestamp;
                return {
                    rawRes: response.data,
                    response: graphingData,
                    maxX: Math.max(...timestamps),
                    interval: Math.max(...equities) / 10,
                    minX: Math.min(...timestamps),
                    maxY: Math.max(...equities),
                    minY: Math.min(...equities) - (0.5 * Math.min(...equities))
                };
            }
        });
    }
    getPortfolioBars({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else if (user.isAlpaca == false) {
                return {
                    "Error": "User is not linked to an Alpaca account"
                };
            }
            else {
                const positions = yield axios_1.default.get("https://paper-api.alpaca.markets/v2/positions", {
                    headers: {
                        "Authorization": `Bearer ${user.alpacaToken}`
                    }
                });
                var symbols = [];
                for (var asset of positions.data) {
                    symbols.push(asset.symbol);
                }
                var symbolString = symbols[0];
                symbols.splice(0, 1);
                for (var symbol of symbols) {
                    symbolString += "," + symbol;
                }
                const bars = yield axios_1.default.get(`https://data.alpaca.markets/v1/bars/day?symbols=${symbolString}&limit=10`, {
                    headers: {
                        "Authorization": `Bearer ${user.alpacaToken}`
                    }
                });
                return bars.data;
            }
        });
    }
    createWatchlist(name, initialSymbols, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                if (initialSymbols.length < 1) {
                    const response = yield axios_1.default.post("https://paper-api.alpaca.markets/v2/watchlists", {
                        "name": name
                    }, {
                        headers: {
                            "Authorization": `Bearer ${user.alpacaToken}`
                        }
                    });
                    return {
                        response: response.data
                    };
                }
                else {
                    const response = yield axios_1.default.post("https://paper-api.alpaca.markets/v2/watchlists", {
                        "name": name,
                        "symbols": initialSymbols
                    }, {
                        headers: {
                            "Authorization": `Bearer ${user.alpacaToken}`
                        }
                    });
                    return {
                        response: response.data
                    };
                }
            }
        });
    }
    stocksNews({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "error": "User does not exist"
                };
            }
            else {
                const response = yield axios_1.default.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=29f00ea0790d46f59ea1b418da7b9ff0");
                var toReturn = [];
                for (var article of response.data.articles) {
                    if (article.source.name.toLowerCase().includes("business insider") || article.source.name.toLowerCase().includes("journal") || article.source.name.toLowerCase().includes("bloomberg") || article.source.name.toLowerCase().includes("financial")) {
                        toReturn.push(article);
                    }
                }
                return {
                    response: toReturn
                };
            }
        });
    }
    authenticateAlpaca(code, state, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Received alpaca request.');
            const user = yield em.findOne(User_1.Users, { id: state });
            if (!user) {
                return {
                    error: [
                        {
                            field: "User",
                            message: "User doesn't exist"
                        }
                    ],
                    user: null
                };
            }
            else {
                let alpacaRequest;
                const params = new URLSearchParams();
                params.append("grant_type", "authorization_code");
                params.append("code", code);
                params.append("client_id", constants_1.alpaca_client_id);
                params.append("client_secret", constants_1.alpaca_client_secret);
                params.append("redirect_uri", "http://isohel.co.uk/redirect/alpaca");
                try {
                    alpacaRequest = yield axios_1.default.post("https://api.alpaca.markets/oauth/token", params, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    });
                }
                catch (e) {
                    if (alpacaRequest.status > 299) {
                        return alpacaRequest.data;
                    }
                }
                if ((alpacaRequest === null || alpacaRequest === void 0 ? void 0 : alpacaRequest.status) == 200) {
                    yield em.nativeUpdate(User_1.Users, { id: user.id }, {
                        alpacaToken: alpacaRequest.data.access_token,
                        isAlpaca: true
                    });
                    return {
                        error: [],
                        user: user
                    };
                }
                else {
                    return {
                        error: [
                            {
                                field: "Authorisation",
                                message: "Either the token has expired or you have already been authorised."
                            }
                        ],
                        user: user
                    };
                }
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getAlpacaRedirect", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.OrderOptions]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "placeOrder", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getAlpacaAccount", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getAlpacaAccountPaper", null);
__decorate([
    type_graphql_1.Mutation(() => [Asset_1.Asset]),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "searchAssets", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getAlpacaPositionsPaper", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getPortfolioHistoryPaper", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getPortfolioBars", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Arg('name')),
    __param(1, type_graphql_1.Arg('initialSymbols', type => [String])),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "createWatchlist", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "stocksNews", null);
__decorate([
    type_graphql_1.Query(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg('code')),
    __param(1, type_graphql_1.Arg('state')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "authenticateAlpaca", null);
alpacaResolver = __decorate([
    type_graphql_1.Resolver()
], alpacaResolver);
exports.alpacaResolver = alpacaResolver;
function getISOStringWithoutSecsAndMillisecs1(date) {
    const dateAndTime = date.toISOString().split('T');
    const time = dateAndTime[1].split(':');
    return dateAndTime[0] + 'T' + time[0] + ':' + time[1] + ':' + time[2].split(".")[0];
}
//# sourceMappingURL=alpaca.js.map