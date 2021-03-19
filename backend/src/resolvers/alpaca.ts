import { Users } from "../entities/User";
import { IsoContext, OrderOptions, UserResponse } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { alpaca_client_id, alpaca_client_secret } from "../constants";
import axios from "axios";
import { GraphQLJSONObject } from "graphql-type-json";
import { Asset } from "../entities/Asset";




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

  @Mutation(() => GraphQLJSONObject)
  async placeOrder(
    @Ctx() { req, em }: IsoContext,
    @Arg('options') options: OrderOptions,

  ) {
    const user = await em.findOne(Users, { id: req.session.userID });

    if (!user) {
      return {
        "Error": "User does not exist"
      }
    }
    const response = await axios.post("https://paper-api.alpaca.markets/v2/orders", options, {
      headers: {
        "Authorization": `Bearer ${user.alpacaToken}`
      },
    })
    return response.data;

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
  @Mutation(() => [Asset])
  async searchAssets(
    @Ctx() { req, em }: IsoContext,
    @Arg('symbol') symbol: string
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });

    if (!user) {
      return {
        "Error": "User does not exist"
      }
    } else {
      try {
        const searchResults = await em.find(Asset, { name_lower: { $re: symbol.toLowerCase() } });
        return searchResults
      }
      catch (e) {
        return { error: e }
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

      var graphingData = [];
      for (let i = 0; i < response.data.timestamp.length; i++) {
        graphingData.push([response.data.timestamp[i], response.data.equity[i]])
      }
      var equities: Array<number> = response.data.equity;
      var timestamps: Array<number> = response.data.timestamp;
      return {
        rawRes: response.data,
        response: graphingData,
        maxX: Math.max(...timestamps),
        interval: Math.max(...equities) / 10,
        minX: Math.min(...timestamps),
        maxY: Math.max(...equities),
        minY: Math.min(...equities) - (0.5 * Math.min(...equities))
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


      var symbolString = symbols[0]
      symbols.splice(0, 1)
      for (var symbol of symbols) {
        symbolString += "," + symbol
      }


      const bars = await axios.get(`https://data.alpaca.markets/v1/bars/day?symbols=${symbolString}&limit=10`, {
        headers: {
          "Authorization": `Bearer ${user.alpacaToken}`
        }
      })
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
        const response = await axios.post("https://paper-api.alpaca.markets/v2/watchlists", {
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
        const response = await axios.post("https://paper-api.alpaca.markets/v2/watchlists", {
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

  @Query(() => GraphQLJSONObject)
  async stocksNews(
    @Ctx() { req, em }: IsoContext
  ) {
    const user = await em.findOne(Users, { id: req.session.userID });
    if (!user) {
      return {
        "error": "User does not exist"
      }
    } else {
      const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=29f00ea0790d46f59ea1b418da7b9ff0")
      var toReturn: any = []
      for (var article of response.data.articles) {
        if (article.source.name.toLowerCase().includes("business insider") || article.source.name.toLowerCase().includes("journal") || article.source.name.toLowerCase().includes("bloomberg") || article.source.name.toLowerCase().includes("financial")) {
          toReturn.push(article)
        }
      }
      return {
        response: toReturn
      };
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