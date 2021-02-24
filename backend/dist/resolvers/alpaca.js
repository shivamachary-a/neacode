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
    getAlpacaAssetsPaper({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            if (!user) {
                return {
                    "Error": "User does not exist"
                };
            }
            else {
                const response = yield axios_1.default.get("https://paper-api.alpaca.markets/v2/assets", {
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
                    const response = yield axios_1.default.post("https://api.alpaca.markets/v2/watchlists", {
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
                    const response = yield axios_1.default.post("https://api.alpaca.markets/v2/watchlists", {
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
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getAlpacaAssetsPaper", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], alpacaResolver.prototype, "getAlpacaPositionsPaper", null);
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
//# sourceMappingURL=alpaca.js.map