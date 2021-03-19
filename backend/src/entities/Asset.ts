import { Entity, Index, PrimaryKey, Property, SerializedPrimaryKey, Unique } from "@mikro-orm/core";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Asset {
    @Field(() => String)
    @PrimaryKey()
    _id: ObjectID;

    @Field()
    @SerializedPrimaryKey()
    id!: string;

    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    class: string;


    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    exchange: string;

    @Field()
    @Property()
    symbol: string;


    @Field()
    @Property()
    @Unique()
    @Index({ type: 'text' })
    name: string;

    @Field()
    @Property()
    @Unique()
    @Index({ type: 'text' })
    name_lower: string;


    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    status: string;

    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    tradable: boolean;

    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    marginable: boolean;

    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    shortable: boolean;

    @Field()
    @Index({ options: { sparse: true } })
    @Property()
    easy_to_borrow: boolean;

}