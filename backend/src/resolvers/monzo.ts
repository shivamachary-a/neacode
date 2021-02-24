import axios from "axios";

import { GraphQLJSONObject } from "graphql-type-json";
import { client_id, client_secret, redirect_uri } from "../constants";
import { Users } from "../entities/User";
import { IsoContext, UserResponse } from "../types";
import { Ctx, Arg, Resolver, Query } from "type-graphql";
import FormData from 'form-data';

@Resolver()
export class monzoResolver {
    @Query(() => String)
    async getMonzoRedirect(
        @Ctx() {req}: IsoContext
    ) {
        return `https://auth.monzo.com/?client_id=oauth2client_0000A4F8fCTv5SEeLLA1VR&redirect_uri=http://isohel.co.uk/redirect&response_type=code&state=${req.session.userID}`;
    }

    @Query(() => GraphQLJSONObject)
    async monzoComplete(
        @Ctx() {req, em}: IsoContext
    ) {
        const user = await em.findOne(Users, {id: req.session.userID});
        var complete = {};
        const accountsRes = await axios.get("https://api.monzo.com/accounts", {
            headers: {
                "Authorization": `Bearer ${user?.monzoToken}`,
            }
        });
        var accounts = [];
        for (let account of accountsRes.data.accounts) {
            accounts.push(account)
        };
        var balances = [];
        for (let account of accounts) {
            const balanceRes = await axios.get(`https://api.monzo.com/balance?account_id=${account.id}`, {
                headers: {
                    "Authorization": `Bearer ${user?.monzoToken}`
                }
            })
            balances.push(balanceRes.data.balance)
        }
        return {
            "accounts": accounts,
            "balances": balances,
        }//
    }

    @Query(() => Boolean)
    async monzoRefreshToken(
        @Ctx() {req, em}: IsoContext
    ) {
        const user = await em.findOne(Users, {id: req.session.userID});
        var body = new FormData();

        body.append("grant_type", "refresh_token")
        body.append("client_id", client_id)
        body.append("client_secret", client_secret)
        body.append("refresh_token", user?.monzoRefresh);
        console.log(body)

        try {
            const refreshResponse = await axios.post("https://api.monzo.com/oauth2/token", body, {
            headers: body.getHeaders()
            });

            user!.monzoToken = refreshResponse.data.access_token;
            user!.monzoRefresh = refreshResponse.data.refresh_token;
            em.persistAndFlush(user!);
            console.log(user);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }

    }

    @Query(()=> GraphQLJSONObject)
    async getMonzoAccounts(
        @Ctx() {req, em} :IsoContext
    ) {
        const user = await em.findOne(Users, {id: req.session.userID});
        const response = await axios.get("https://api.monzo.com/accounts", {
            headers: {
                "Authorization": `Bearer ${user?.monzoToken}`
            }
        })
        return response.data //returns a list of the users accounts
    }

    @Query(()=> GraphQLJSONObject)
    async monzoMe (
        @Ctx() {req, em} :IsoContext
    ) {
        const user = await em.findOne(Users, {id: req.session.userID});
        const response = await axios.get("https://api.monzo.com/ping/whoami", {
            headers: {
                "Authorization": `Bearer ${user?.monzoToken}`
            }
        })
        return response.data; //returns info about the connected monzo account
    }

    @Query(() => UserResponse)
    async authenticateMonzo(
        @Arg('code') code: string,
        @Arg('state') state: string,
        @Ctx() {em}: IsoContext
    ) {
        console.log("Received monzo request.")

            const user = await em.findOne(Users,{id: state});

            if (!user) {
                return {
                    error: [
                        {
                            field: "User",
                            message: "User doesn't exist"
                        }
                    ],
                    user: null
                }
            }
            else {
            var body = new FormData();
            body.append("grant_type", "authorization_code")
            body.append("client_id", client_id)
            body.append("client_secret", client_secret)
            body.append("redirect_uri", redirect_uri)
            body.append("code", code);
            try {
            
            const monzoRequest = await axios.post("https://api.monzo.com/oauth2/token", body, {
                headers: body.getHeaders()
            });

            if (monzoRequest.status == 401) {
                return {
                    error: [
                        {
                            field: "Authorisation",
                            message: "Either the token has expired or you have already been authorised."
                        }
                    ],
                    user: user
                }
            }
            else if(monzoRequest.status != 200 && monzoRequest.status != 401){
                return {
                    error: [
                        {
                        field: "Authorisation",
                        message: monzoRequest.statusText
                        }
                    ],
                    user: user
                }
            }
            else {
                em.nativeUpdate(Users, {id: state}, {
                    monzoToken: monzoRequest.data.access_token,
                    monzoRefresh: monzoRequest.data.refresh_token,
                    monzoID: monzoRequest.data.user_id,
                    monzoType: monzoRequest.data.token_type,
                    isMonzo: true
                })
                em.flush();
                return {
                    error: [
                        {
                            field: "",
                            message: "success!"
                        }
                    ],
                    user: user
                }
            }
        }
            catch(e) {
                return {
                    error: [{
                        field: "Authorisation",
                        message: e.toString()
                    }]
                }
            }
        }        
    }
}
