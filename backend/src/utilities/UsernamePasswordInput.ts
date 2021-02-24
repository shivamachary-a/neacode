import { Field, InputType } from "type-graphql";


@InputType()
export class UsernamePasswordInput {
    @Field(() => String)
    username: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String)
    password: string;
}
