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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOptions = exports.SearchResponse = exports.StockResponse = exports.UserResponse = exports.FieldError = void 0;
const type_graphql_1 = require("type-graphql");
const Stock_1 = require("./entities/Stock");
const User_1 = require("./entities/User");
const graphql_type_json_1 = require("graphql-type-json");
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
exports.FieldError = FieldError;
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.Users, { nullable: true }),
    __metadata("design:type", User_1.Users)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let StockResponse = class StockResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], StockResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => Stock_1.Stocks, { nullable: true }),
    __metadata("design:type", Stock_1.Stocks)
], StockResponse.prototype, "stock", void 0);
StockResponse = __decorate([
    type_graphql_1.ObjectType()
], StockResponse);
exports.StockResponse = StockResponse;
let SearchResponse = class SearchResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], SearchResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => [graphql_type_json_1.GraphQLJSONObject], { nullable: true }),
    __metadata("design:type", Array)
], SearchResponse.prototype, "results", void 0);
SearchResponse = __decorate([
    type_graphql_1.ObjectType()
], SearchResponse);
exports.SearchResponse = SearchResponse;
let OrderOptions = class OrderOptions {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OrderOptions.prototype, "symbol", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OrderOptions.prototype, "qty", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OrderOptions.prototype, "side", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OrderOptions.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OrderOptions.prototype, "time_in_force", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OrderOptions.prototype, "limit_price", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OrderOptions.prototype, "stop_price", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OrderOptions.prototype, "trail_price", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OrderOptions.prototype, "trail_percent", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Boolean)
], OrderOptions.prototype, "extended_hours", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OrderOptions.prototype, "order_class", void 0);
OrderOptions = __decorate([
    type_graphql_1.InputType()
], OrderOptions);
exports.OrderOptions = OrderOptions;
//# sourceMappingURL=types.js.map