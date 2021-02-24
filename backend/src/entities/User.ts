import { Entity, Index, PrimaryKey, Property, SerializedPrimaryKey, Unique } from "@mikro-orm/core";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@Unique({properties:['username']})
@ObjectType()
@Entity()
export class Users {
    @Field(() => String)
    @PrimaryKey()
    _id: ObjectID;

    @Field()
    @SerializedPrimaryKey()
    id!:string;

    @Unique()
    @Field(() => String)
    @Property({type: 'text', unique: true})
    username!: string;

    @Field(() => String)
    @Property({type: 'text', unique: true})
    email?: string;

    @Field(() => Boolean)
    @Index({options:{sparse: true}})
    @Property({type: 'boolean', unique: false})
    isMonzo?: boolean;

    @Field(() => Boolean)
    @Index({options:{sparse: true}})
    @Property({type: 'boolean', unique: false})
    isAlpaca?: boolean;

    @Property({type: 'text', unique: true})
    monzoCode?: string;

    @Property({type: 'text', unique: true})
    monzoToken?: string;

    @Property({type: 'text', unique: true})
    monzoRefresh?: string;

    @Property({type: 'text', unique: true})
    monzoType?: string;

    @Property({type: 'text', unique: true})
    monzoID?: string;

    @Property({type: 'text', unique: true})
    alpacaToken?: string;



    @Property({type: 'text'})
    password!: string;

    
    




}