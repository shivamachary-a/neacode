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
exports.Users = void 0;
const core_1 = require("@mikro-orm/core");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
let Users = class Users {
};
__decorate([
    type_graphql_1.Field(() => String),
    core_1.PrimaryKey(),
    __metadata("design:type", mongodb_1.ObjectID)
], Users.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.SerializedPrimaryKey(),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    core_1.Unique(),
    type_graphql_1.Field(() => String),
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    core_1.Index({ options: { sparse: true } }),
    core_1.Property({ type: 'boolean', unique: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isMonzo", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    core_1.Index({ options: { sparse: true } }),
    core_1.Property({ type: 'boolean', unique: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAlpaca", void 0);
__decorate([
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "monzoCode", void 0);
__decorate([
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "monzoToken", void 0);
__decorate([
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "monzoRefresh", void 0);
__decorate([
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "monzoType", void 0);
__decorate([
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "monzoID", void 0);
__decorate([
    core_1.Property({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "alpacaToken", void 0);
__decorate([
    core_1.Property({ type: 'text' }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
Users = __decorate([
    core_1.Unique({ properties: ['username'] }),
    type_graphql_1.ObjectType(),
    core_1.Entity()
], Users);
exports.Users = Users;
//# sourceMappingURL=User.js.map