import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from 'express';
import { ObjectType, Field, InputType } from "type-graphql";
import { Stocks } from "./entities/Stock";
import { Users } from "./entities/User";
import { GraphQLJSONObject } from 'graphql-type-json';
import { Redis } from "ioredis";


export type IsoContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    req: Request,
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
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];

    @Field(() => Users, { nullable: true })
    user?: Users;
}

@ObjectType()
export class StockResponse {
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];

    @Field(() => Stocks, { nullable: true })
    stock?: Stocks;
}

@ObjectType()
export class SearchResponse {
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];

    @Field(() => [GraphQLJSONObject], { nullable: true })
    results?: [{}]
}

@InputType()
export class OrderOptions {
    @Field()
    symbol!: string;
    @Field()
    qty!: string;
    @Field()
    side!: string;
    @Field()
    type!: string;
    @Field(() => String, { nullable: true })
    time_in_force!: string;
    @Field(() => String, { nullable: true })
    limit_price?: string;
    @Field(() => String, { nullable: true })
    stop_price?: string;
    @Field(() => String, { nullable: true })
    trail_price?: string;
    @Field(() => String, { nullable: true })
    trail_percent?: string;
    @Field(() => String, { nullable: true })
    extended_hours?: boolean;
    @Field(() => String, { nullable: true })
    order_class?: string;


}