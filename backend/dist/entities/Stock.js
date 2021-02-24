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
exports.Stocks = void 0;
const core_1 = require("@mikro-orm/core");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
let Stocks = class Stocks {
};
__decorate([
    type_graphql_1.Field(() => String),
    core_1.PrimaryKey(),
    __metadata("design:type", mongodb_1.ObjectID)
], Stocks.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.SerializedPrimaryKey(),
    __metadata("design:type", String)
], Stocks.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", String)
], Stocks.prototype, "companyName", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: 'text' }),
    __metadata("design:type", String)
], Stocks.prototype, "symbol", void 0);
Stocks = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity()
], Stocks);
exports.Stocks = Stocks;
//# sourceMappingURL=Stock.js.map