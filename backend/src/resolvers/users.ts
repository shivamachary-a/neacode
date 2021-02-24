import argon2 from 'argon2';
import { ObjectID } from 'mongodb';
import { IsoContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from 'uuid';
import { F_PASS_PREFIX } from '../constants';
import { Portfolio } from '../entities/Portfolio';
import { Stocks } from '../entities/Stock';
import { Users } from "../entities/User";
import { UserResponse } from '../types';
import { sendEmail } from '../utilities/sendEmailUtil';
import { UsernamePasswordInput } from "../utilities/UsernamePasswordInput";


declare module "express-session" {
    interface Session {
      userID: string;
    }
  }


@Resolver()
export class userResolver {
    @Query(() => Users, {nullable: true})
    async Me(
        @Ctx() {em, req}: IsoContext
    ) {
        console.log(req.session.userID);
        const user = await em.findOne(Users, {id: req.session.userID});

        return user;
    }
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() {redis, em, req}: IsoContext
    ): Promise<UserResponse> {

        if (newPassword.length < 2) {
            return { error: [
                {
                    field: "newPassword",
                    message: "length must be greater than two."
                }
            ]};
        }
        const redisKey = F_PASS_PREFIX + token;
        const user  = await redis.get(redisKey);

        if (!user) {
            return {
                error: [
                    {
                        field: "token",
                        message: "token expired."
                    }
                ]
            }
        }

        const currentUser = await em.findOne(Users,{id: user});

        if (!user) {
            return {
                error: [
                    {
                        field: "token",
                        message: "user no longer exists."
                    }
                ]
            }
        }

        currentUser!.password = await argon2.hash(newPassword)
        em.persistAndFlush(currentUser!);

        await redis.del(redisKey);
        req.session.userID = currentUser!.id;

        return {
            user: currentUser!
        }

    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {em, redis}: IsoContext
    ){
      const user = await em.findOne(Users, {email});

      if (!user) {
          return true;
      }

      const token = v4();

      await redis.set(F_PASS_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 72);
      
      await sendEmail(email,
        '<a href="http://localhost:3000/change-password/'+ token + '">reset password</a>')

      return true;

    }

    @Query(() => [Users])
    allUsers(
        @Ctx() {em}: IsoContext
    ) {
        return em.find(Users, {});

    }
    
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() {em, req}: IsoContext
    ): Promise<UserResponse>{

        if (options.username.length <=3) {
            return {
                error:[
                    {
                        field: 'Username',
                        message:'username must be longer than 3 characters.'
                    }
                ]
            }
            
        }
        if (!options.email?.includes("@")) {
            return {
                error:[
                    {
                        field: 'email',
                        message: 'email format is invalid.'
                    }
                ]
            }
        }
    
        if (options.username?.includes("@")) {
            return  {
                error:[
                    {
                        field: 'username',
                        message: 'username cannot contain an "@".'
                    }
                ]
            }
        }
    
        if (options.password.length <=6){
            return {error:  [
                    {
                        field: 'Password',
                        message: 'password must be longer than 6 characters.'
                    }
                ]
            }
        }


        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(Users, {
            username: options.username,
            email: options.email,
            password: hashedPassword,
            isMonzo: false,
            monzoCode: '',
            monzoToken: '',
            monzoID: '',
            monzoRefresh: '',
            monzoType: '',
            isAlpaca: false,
            alpacaToken: ''
        })
        try{
            await em.persistAndFlush(user);
            const userID = new ObjectID(user.id);

            try {
                const newPortfolio = await em.create(Portfolio, {id: userID, portfolio: []})
                em.persistAndFlush(newPortfolio);
        
            }
            catch (e) {
                console.log(e);
            }
        }
        catch (err) {
            console.log(err.toString());
            if (err.toString().includes("duplicate")) {
                return {
                    error: [{
                        field: 'Username',
                        message: 'User already exists, please log in or choose new credentials.'
                    }]

                }
            }
        }

        req.session.userID = user.id;
        // TODO: Send request to userStockManagement service to create new portfolios.
        return {
            user: user
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() {req, res}: IsoContext) {
        
        return new Promise((resolve) => 
        req.session.destroy((err) => {   
        if (err) {
            console.log(err);
            resolve(false);
            return;
        }
        res.clearCookie("qid");      
        resolve(true);
            
        }))
    }

    // @Query(() => [Stocks])
    // async getUsersStocks(
    //     @Ctx() {em, req}: IsoContext
    // ) {
    //     const user = await em.findOne(Users, {id: req.session.userID}, ['portfolio'])
    //     var  currentportfolio = [];;
    //     if (user) {
    //     for (const stock of user!.portfolio) {
    //         currentportfolio.push(stock)
    //     }
    //     }   
        
    //     return currentportfolio;
        
    // }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() {em, req}: IsoContext
    ): Promise<UserResponse>{
        const user = await em.findOne(
            Users,
            usernameOrEmail.includes("@")
             ? {email: usernameOrEmail}
             : {username: usernameOrEmail}
            );

        if(!user) {
            return {
                error: [{
                    field: 'usernameOrEmail',
                    message: 'User does not exist'
                }]
            }
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
            return {
                error: [{
                    field: 'Password',
                    message: 'Password is incorrect'
                }]
            }
        }

        req.session.userID = user.id;
        console.log(req.session.userID);
        return {
            user: user
        }
    }
    @Query(() => [Stocks])
    async all(
        @Ctx() {em} :IsoContext,
    ){
        return em.find(Stocks, {});
    }
}
