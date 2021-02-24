import { Entity, Index, PrimaryKey, Property, SerializedPrimaryKey} from "@mikro-orm/core";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class securityOverview {
    @Field(() => String)
    @PrimaryKey()
    _id: ObjectID;

    @Field()
    @SerializedPrimaryKey()
    id!:string;

    @Field(() => String)
    @Property({type: 'text'})
    symbol!: string;

    @Field(() => String)
    @Property({type: 'text'})
    name!: string;

    @Field(() => String)
    @Property({type: 'text'})
    description?: string;

    @Field(() => String)
    @Index({options:{sparse: true}})
    @Property()
    exchange?: string;

    @Field(() => String)
    @Index({options:{sparse: true}})
    @Property()
    industry?: string;

    @Field(() => String)
    @Index({options:{sparse: true}})
    @Property()
    sector?: string;

}