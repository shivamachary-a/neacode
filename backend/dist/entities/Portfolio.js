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
exports.Portfolio = void 0;
const core_1 = require("@mikro-orm/core");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const Stock_1 = require("./Stock");
let Portfolio = class Portfolio {
    constructor() {
        this.portfolio = new core_1.Collection(this);
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    core_1.PrimaryKey(),
    __metadata("design:type", mongodb_1.ObjectID)
], Portfolio.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    core_1.SerializedPrimaryKey(),
    __metadata("design:type", String)
], Portfolio.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => Stock_1.Stocks),
    core_1.ManyToMany({ type: Stock_1.Stocks }),
    __metadata("design:type", Object)
], Portfolio.prototype, "portfolio", void 0);
Portfolio = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity()
], Portfolio);
exports.Portfolio = Portfolio;
//# sourceMappingURL=Portfolio.js.map