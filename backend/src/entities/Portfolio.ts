import { Collection, Entity, ManyToMany, PrimaryKey, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Stocks } from "./Stock";

@ObjectType()
@Entity()
export class Portfolio {
    @Field(() => String)
    @PrimaryKey()
    _id: ObjectID;

    @Field(() => String)
    @SerializedPrimaryKey()
    id: String;

    @Field(() => Stocks)
    @ManyToMany({type: Stocks})
    portfolio = new Collection<Stocks>(this);


    
}