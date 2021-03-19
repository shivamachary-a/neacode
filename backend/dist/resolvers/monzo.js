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
exports.monzoResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const graphql_type_json_1 = require("graphql-type-json");
const constants_1 = require("../constants");
const User_1 = require("../entities/User");
const types_1 = require("../types");
const type_graphql_1 = require("type-graphql");
const form_data_1 = __importDefault(require("form-data"));
const Transaction_1 = require("../entities/Transaction");
let monzoResolver = class monzoResolver {
    getMonzoRedirect({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return `https://auth.monzo.com/?client_id=oauth2client_0000A4F8fCTv5SEeLLA1VR&redirect_uri=http://isohel.co.uk/redirect&response_type=code&state=${req.session.userID}`;
        });
    }
    monzoComplete({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            var complete = {};
            const accountsRes = yield axios_1.default.get("https://api.monzo.com/accounts", {
                headers: {
                    "Authorization": `Bearer ${user === null || user === void 0 ? void 0 : user.monzoToken}`,
                }
            });
            if (accountsRes.status == 401) {
                this.monzoRefreshToken({ req, em });
            }
            var accounts = [];
            for (let account of accountsRes.data.accounts) {
                accounts.push(account);
            }
            ;
            var balances = [];
            for (let account of accounts) {
                const balanceRes = yield axios_1.default.get(`https://api.monzo.com/balance?account_id=${account.id}`, {
                    headers: {
                        "Authorization": `Bearer ${user === null || user === void 0 ? void 0 : user.monzoToken}`
                    }
                });
                balances.push(balanceRes.data.balance);
            }
            var transactions = [];
            for (let account of accounts) {
                try {
                    const trans = yield axios_1.default.get(`https://api.monzo.com/transactions?account_id=${account.id}`, {
                        headers: {
                            "Authorization": `Bearer ${user === null || user === void 0 ? void 0 : user.monzoToken}`
                        }
                    });
                    for (var transaction of trans.data.transactions) {
                        try {
                            yield em.nativeInsert(Transaction_1.Transactions, {
                                userID: transaction.user_id,
                                created: transaction.created,
                                description: transaction.description,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                category: transaction.category,
                                accountID: transaction.account_id
                            });
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
                const transactionsList = yield em.find(Transaction_1.Transactions, { accountID: account.id });
                console.log(transactionsList);
                if (transactionsList.length == 0) {
                    const balanceRes = yield axios_1.default.get(`https://api.monzo.com/transactions?account_id=${account.id}`, {
                        headers: {
                            "Authorization": `Bearer ${user === null || user === void 0 ? void 0 : user.monzoToken}`
                        }
                    });
                    console.log(balanceRes.data);
                    if (balanceRes.status != 403) {
                        for (var transaction of balanceRes.data.transactions) {
                            try {
                                yield em.nativeInsert(Transaction_1.Transactions, {
                                    userID: transaction.user_id,
                                    created: transaction.created,
                                    description: transaction.description,
                                    amount: transaction.amount,
                                    currency: transaction.currency,
                                    category: transaction.category,
                                    accountID: transaction.account_id
                                });
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    else {
                        console.log("error");
                        transactions.push(balanceRes.data);
                    }
                }
                else {
                    transactions.push(transactionsList);
                }
            }
            return {
                "accounts": accounts,
                "balances": balances,
                "transactions": transactions
            };
        });
    }
    monzoRefreshToken({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            var body = new form_data_1.default();
            body.append("grant_type", "refresh_token");
            body.append("client_id", constants_1.client_id);
            body.append("client_secret", constants_1.client_secret);
            body.append("refresh_token", user === null || user === void 0 ? void 0 : user.monzoRefresh);
            console.log(body);
            try {
                const refreshResponse = yield axios_1.default.post("https://api.monzo.com/oauth2/token", body, {
                    headers: body.getHeaders()
                });
                user.monzoToken = refreshResponse.data.access_token;
                user.monzoRefresh = refreshResponse.data.refresh_token;
                em.persistAndFlush(user);
                console.log(user);
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
    }
    getMonzoAccounts({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            const response = yield axios_1.default.get("https://api.monzo.com/accounts", {
                headers: {
                    "Authorization": `Bearer ${user === null || user === void 0 ? void 0 : user.monzoToken}`
                }
            });
            return response.data;
        });
    }
    monzoMe({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            const response = yield axios_1.default.get("https://api.monzo.com/ping/whoami", {
                headers: {
                    "Authorization": `Bearer ${user === null || user === void 0 ? void 0 : user.monzoToken}`
                }
            });
            return response.data;
        });
    }
    authenticateMonzo(code, state, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Received monzo request.");
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
                var body = new form_data_1.default();
                body.append("grant_type", "authorization_code");
                body.append("client_id", constants_1.client_id);
                body.append("client_secret", constants_1.client_secret);
                body.append("redirect_uri", constants_1.redirect_uri);
                body.append("code", code);
                try {
                    const monzoRequest = yield axios_1.default.post("https://api.monzo.com/oauth2/token", body, {
                        headers: body.getHeaders()
                    });
                    if (monzoRequest.status == 401) {
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
                    else if (monzoRequest.status != 200 && monzoRequest.status != 401) {
                        return {
                            error: [
                                {
                                    field: "Authorisation",
                                    message: monzoRequest.statusText
                                }
                            ],
                            user: user
                        };
                    }
                    else {
                        em.nativeUpdate(User_1.Users, { id: state }, {
                            monzoToken: monzoRequest.data.access_token,
                            monzoRefresh: monzoRequest.data.refresh_token,
                            monzoID: monzoRequest.data.user_id,
                            monzoType: monzoRequest.data.token_type,
                            isMonzo: true
                        });
                        em.flush();
                        return {
                            error: [
                                {
                                    field: "",
                                    message: "success!"
                                }
                            ],
                            user: user
                        };
                    }
                }
                catch (e) {
                    return {
                        error: [{
                                field: "Authorisation",
                                message: e.toString()
                            }]
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
], monzoResolver.prototype, "getMonzoRedirect", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], monzoResolver.prototype, "monzoComplete", null);
__decorate([
    type_graphql_1.Query(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], monzoResolver.prototype, "monzoRefreshToken", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], monzoResolver.prototype, "getMonzoAccounts", null);
__decorate([
    type_graphql_1.Query(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], monzoResolver.prototype, "monzoMe", null);
__decorate([
    type_graphql_1.Query(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg('code')),
    __param(1, type_graphql_1.Arg('state')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], monzoResolver.prototype, "authenticateMonzo", null);
monzoResolver = __decorate([
    type_graphql_1.Resolver()
], monzoResolver);
exports.monzoResolver = monzoResolver;
//# sourceMappingURL=monzo.js.map