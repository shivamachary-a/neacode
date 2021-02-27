import { Users } from "../entities/User";
import { IsoContext, UserResponse } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { alpaca_client_id, alpaca_client_secret } from "../constants";
import axios from "axios";
import { GraphQLJSONObject } from "graphql-type-json";


@Resolver()
export class alpacaResolver {

  @Query(() => String)
  async getAlpacaRedirect(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID })
    if (!user) {
      return "Error: user doesn't exist"
    }

    else {
      return `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${alpaca_client_id}&redirect_uri=http://isohel.co.uk/redirect/alpaca&state=${user!.id}&scope=account:write%20trading%20data`
    }
  }

  @Query(() => GraphQLJSONObject)
  async getAlpacaAccount(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else {
      const response = await axios.get("https://api.alpaca.markets/v2/account", {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      return response.data
    }
  }
  @Query(() => GraphQLJSONObject)
  async getAlpacaAccountPaper(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else {
      const response = await axios.get("https://paper-api.alpaca.markets/v2/account", {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      return response.data
    }
  }
  @Query(() => GraphQLJSONObject)
  async getAlpacaAssetsPaper(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else {
      const response = await axios.get("https://paper-api.alpaca.markets/v2/assets", {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      return {
        response: response.data
      }
    }
  }

  @Query(() => GraphQLJSONObject)
  async getAlpacaPositionsPaper(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else {
      const response = await axios.get("https://paper-api.alpaca.markets/v2/positions", {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      return {
        response: response.data
      }
    }
  }

  @Query(() => GraphQLJSONObject)
  async getPortfolioHistoryPaper(
    @Ctx() { req, em }: IsoContext,
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else {
      const response = await axios.get("https://paper-api.alpaca.markets/v2/account/portfolio/history", {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      console.log(response.data)
      var graphingData = [];
      for (let i = 0; i < response.data.timestamp.length; i++) {
        graphingData.push([response.data.timestamp[i], response.data.equity[i]])
      }
      return {
        response: graphingData,
        maxX: Math.max(response.data.timestamp),
        minX: Math.min(response.data.timestamp),
        maxY: Math.max(response.data.equity),
        minY: Math.min(response.data.equity) - (0.5 * Math.min(response.data.equity))
      }
    }
  }

  @Query(() => GraphQLJSONObject)
  async getPortfolioBars(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else if (user.isAlpaca == false) {
      return {
        "Error": "User is not linked to an Alpaca account"
      }
    }
    else {
      const positions = await axios.get("https://paper-api.alpaca.markets/v2/positions", {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      var symbols = [];
      for (var asset of positions.data) {
        symbols.push(asset.symbol)
      }
      var priceHistories = [];
      var beforedate = new Date();
      const date = new Date(new Date().setDate(beforedate.getDate() - 30))
      var symbolString = symbols[0]
      symbols.splice(0, 1)
      for (var symbol of symbols) {
        symbolString += "," + symbol
      }
      console.log(symbolString);

      const bars = await axios.get(`https://data.alpaca.markets/v1/bars/day?symbols=${symbolString}&limit=10`, {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
      console.log(bars.request)
      return bars.data
    }
  }

  @Mutation(() => GraphQLJSONObject)
  async createWatchlist(
    @Arg('name') name: string,
    @Arg('initialSymbols', type => [String]) initialSymbols: string[],
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID })
    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    else {
      if (initialSymbols.length < 1) {
        const response = await axios.post("https://api.alpaca.markets/v2/watchlists", {
          "name": name
        }, {
          headers: {
            "Authorization": `Bearer ${user.alpacaToken}`
          }
        })
        return {
          response: response.data
        }
      }
      else {
        const response = await axios.post("https://api.alpaca.markets/v2/watchlists", {
          "name": name,
          "symbols": initialSymbols
        }, {
          headers: {
            "Authorization": `Bearer ${user.alpacaToken}`
          }
        })
        return {
          response: response.data
        }
      }
    }
  }

  @Query(() => UserResponse)
  async authenticateAlpaca(
    @Arg('code') code: string,
    @Arg('state') state: string,
    @Ctx() { em }: IsoContext
  ) {
    console.log('Received alpaca request.')
    const user = await em.findOne(Users, { id: state });
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
      let alpacaRequest: any;

      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code")
      params.append("code", code);
      params.append("client_id", alpaca_client_id);
      params.append("client_secret", alpaca_client_secret);
      params.append("redirect_uri", "http://isohel.co.uk/redirect/alpaca")
      try {
        alpacaRequest = await axios.post("https://api.alpaca.markets/oauth/token", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

      }
      catch (e) {
        if (alpacaRequest!.status > 299) {
          return alpacaRequest.data;
        }
      }
      if (alpacaRequest?.status == 200) {
        await em.nativeUpdate(Users, { id: user.id }, {
          alpacaToken: alpacaRequest.data.access_token,
          isAlpaca: true
        })
        return {
          error: [],
          user: user
        }
      }
      else {
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
    }
  }
}

function getISOStringWithoutSecsAndMillisecs1(date: any) {
  const dateAndTime = date.toISOString().split('T')
  const time = dateAndTime[1].split(':')

  return dateAndTime[0] + 'T' + time[0] + ':' + time[1] + ':' + time[2].split(".")[0]
}