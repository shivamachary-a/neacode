import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Stocks {
    @Field(() => String)
    @PrimaryKey()
    _id: ObjectID;

    @Field()
    @SerializedPrimaryKey()
    id!:string;

    @Field()
    @Property()
    companyName: string;


    @Field()
    @Property({type: 'text'})
    symbol: string;
    
}