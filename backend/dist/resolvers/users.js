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
exports.userResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const Portfolio_1 = require("../entities/Portfolio");
const Stock_1 = require("../entities/Stock");
const User_1 = require("../entities/User");
const types_1 = require("../types");
const sendEmailUtil_1 = require("../utilities/sendEmailUtil");
const UsernamePasswordInput_1 = require("../utilities/UsernamePasswordInput");
let userResolver = class userResolver {
    Me({ em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.session.userID);
            const user = yield em.findOne(User_1.Users, { id: req.session.userID });
            return user;
        });
    }
    changePassword(token, newPassword, { redis, em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPassword.length < 2) {
                return { error: [
                        {
                            field: "newPassword",
                            message: "length must be greater than two."
                        }
                    ] };
            }
            const redisKey = constants_1.F_PASS_PREFIX + token;
            const user = yield redis.get(redisKey);
            if (!user) {
                return {
                    error: [
                        {
                            field: "token",
                            message: "token expired."
                        }
                    ]
                };
            }
            const currentUser = yield em.findOne(User_1.Users, { id: user });
            if (!user) {
                return {
                    error: [
                        {
                            field: "token",
                            message: "user no longer exists."
                        }
                    ]
                };
            }
            currentUser.password = yield argon2_1.default.hash(newPassword);
            em.persistAndFlush(currentUser);
            yield redis.del(redisKey);
            req.session.userID = currentUser.id;
            return {
                user: currentUser
            };
        });
    }
    forgotPassword(email, { em, redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, { email });
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            yield redis.set(constants_1.F_PASS_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 72);
            yield sendEmailUtil_1.sendEmail(email, '<a href="http://localhost:3000/change-password/' + token + '">reset password</a>');
            return true;
        });
    }
    allUsers({ em }) {
        return em.find(User_1.Users, {});
    }
    register(options, { em, req }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (options.username.length <= 3) {
                return {
                    error: [
                        {
                            field: 'Username',
                            message: 'username must be longer than 3 characters.'
                        }
                    ]
                };
            }
            if (!((_a = options.email) === null || _a === void 0 ? void 0 : _a.includes("@"))) {
                return {
                    error: [
                        {
                            field: 'email',
                            message: 'email format is invalid.'
                        }
                    ]
                };
            }
            if ((_b = options.username) === null || _b === void 0 ? void 0 : _b.includes("@")) {
                return {
                    error: [
                        {
                            field: 'username',
                            message: 'username cannot contain an "@".'
                        }
                    ]
                };
            }
            if (options.password.length <= 6) {
                return { error: [
                        {
                            field: 'Password',
                            message: 'password must be longer than 6 characters.'
                        }
                    ]
                };
            }
            const hashedPassword = yield argon2_1.default.hash(options.password);
            const user = em.create(User_1.Users, {
                username: options.username,
                email: options.email,
                password: hashedPassword,
                isMonzo: false,
                monzoCode: '',
                monzoToken: '',
                monzoID: '',
                monzoRefresh: '',
                monzoType: '',
                isAlpaca: false,
                alpacaToken: ''
            });
            try {
                yield em.persistAndFlush(user);
                const userID = new mongodb_1.ObjectID(user.id);
                try {
                    const newPortfolio = yield em.create(Portfolio_1.Portfolio, { id: userID, portfolio: [] });
                    em.persistAndFlush(newPortfolio);
                }
                catch (e) {
                    console.log(e);
                }
            }
            catch (err) {
                console.log(err.toString());
                if (err.toString().includes("duplicate")) {
                    return {
                        error: [{
                                field: 'Username',
                                message: 'User already exists, please log in or choose new credentials.'
                            }]
                    };
                }
            }
            req.session.userID = user.id;
            return {
                user: user
            };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            res.clearCookie("qid");
            resolve(true);
        }));
    }
    login(usernameOrEmail, password, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.Users, usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail });
            if (!user) {
                return {
                    error: [{
                            field: 'usernameOrEmail',
                            message: 'User does not exist'
                        }]
                };
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return {
                    error: [{
                            field: 'Password',
                            message: 'Password is incorrect'
                        }]
                };
            }
            req.session.userID = user.id;
            console.log(req.session.userID);
            return {
                user: user
            };
        });
    }
    all({ em }) {
        return __awaiter(this, void 0, void 0, function* () {
            return em.find(Stock_1.Stocks, {});
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.Users, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "Me", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg('token')),
    __param(1, type_graphql_1.Arg('newPassword')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Query(() => [User_1.Users]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userResolver.prototype, "allUsers", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput_1.UsernamePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("usernameOrEmail")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Query(() => [Stock_1.Stocks]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "all", null);
userResolver = __decorate([
    type_graphql_1.Resolver()
], userResolver);
exports.userResolver = userResolver;
//# sourceMappingURL=users.js.map