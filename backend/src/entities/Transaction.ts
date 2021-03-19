import { Entity, Index, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Transactions {
    @Field(() => String)
    @PrimaryKey()
    _id: ObjectID;

    @Field()
    @SerializedPrimaryKey()
    id!: string;

    @Field(() => String)
    @Index({ options: { sparse: true } })
    @Property()
    userID!: string;

    @Field(() => String)
    @Index({ options: { sparse: true } })
    @Property()
    description!: string;

    @Field(() => String)
    @Index({ options: { sparse: true } })
    @Property()
    amount!: number;

    @Field(() => String)
    @Property()
    created!: string;

    @Field(() => String)
    @Index({ options: { sparse: true } })
    @Property()
    currency!: string;

    @Field(() => String)
    @Index({ options: { sparse: true } })
    @Property()
    category!: string;

    @Field(() => String)
    @Index({ options: { sparse: true } })
    @Property()
    accountID!: string;

}