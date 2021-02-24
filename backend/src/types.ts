import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import {Request, Response} from 'express';
import { ObjectType, Field } from "type-graphql";
import { Stocks } from "./entities/Stock";
import { Users } from "./entities/User";
import { GraphQLJSONObject } from 'graphql-type-json';
import { Redis } from "ioredis";


export type IsoContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    req: Request,
    redis: Redis,
    res: Response
};

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    error?: FieldError[];

    @Field(() => Users, {nullable: true})
    user?: Users;
}

@ObjectType()
export class StockResponse {
    @Field(() => [FieldError], {nullable: true})
    error?: FieldError[];

    @Field(() => Stocks, {nullable: true})
    stock?: Stocks;
}

@ObjectType()
export class SearchResponse {
    @Field(() => [FieldError], {nullable: true})
    error?: FieldError[];

    @Field(() => [GraphQLJSONObject], {nullable: true})
    results?: [{}]
}