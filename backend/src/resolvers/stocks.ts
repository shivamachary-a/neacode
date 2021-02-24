import axios from 'axios';
import { GraphQLJSONObject } from 'graphql-type-json';
import { securityOverview } from '../entities/SecurityOverview';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Portfolio } from '../entities/Portfolio';
import { Stocks } from '../entities/Stock';
import { Users } from '../entities/User';
import { Watchlist } from '../entities/Watchlist';
import { IsoContext, SearchResponse, StockResponse } from '../types';
 


@Resolver()
export class stockResolver {
    // Base Query to return every stock in the 'stocks' table.
    @Query(() => [Stocks])
    async all(
        @Ctx() {em} :IsoContext,
    ){
        return em.find(Stocks, {});
    }

    // TODO: Add market specification so as to avoid ticker conflict.
    // TODO: Way better error handling, this is a MVP.
    @Mutation(() => StockResponse)
    async addToPortfolio(
        @Arg('ticker') ticker: string,
        @Ctx() {req,em}: IsoContext
    ): Promise<StockResponse> {
        const currentPortfolio = await em.findOne(Portfolio, {id: req.session.userID});

        const stockToAdd = await em.findOne(Stocks, {symbol: ticker});

        if (currentPortfolio && stockToAdd) {
            try{
                currentPortfolio.portfolio.add(stockToAdd);
                em.persistAndFlush(currentPortfolio);
                return {
                    error: [],
                    stock: stockToAdd
                };
            }
            catch(e){
                return {
                    error: [
                        {
                            field:'',
                            message: e.toString()
                        }
                    ]
                }
            }
        }

        else {
            return {
                error:[{
                    field: "Stock/User",
                    message: "Either the stock does not exist, or the user does not exist."
                }]
            }
        }
    }
    
    // TODO: Add market specification so as to avoid ticker conflict.
    // TODO: Way better error handling, this is a MVP.
    @Mutation(() => Boolean)
    async addToWatchlist(
        @Arg('ticker') ticker: string,
        @Ctx() {req,em}: IsoContext
    ) {
        const currentWatchlist = await em.findOne(Watchlist, {id: req.session.userID});

        const stockToAdd = await em.findOne(Stocks, {symbol: ticker});

        if (currentWatchlist && stockToAdd) {
            currentWatchlist.watchlist.add(stockToAdd);
            em.persistAndFlush(currentWatchlist);
            return true;
        }

        else {
            return false;
        }
        
    }

    // TODO: Add market specification so as to avoid ticker conflict.
    // TODO: Way better error handling, this is a MVP.
    @Mutation(() => Boolean)
    async removeFromWatchlist(
        @Arg('ticker') ticker: string,
        @Ctx() {req,em}: IsoContext
    ) {
        const currentWatchlist = await em.findOne(Watchlist, {id: req.session.userID});

        const stockToRemove = await em.findOne(Stocks, {symbol: ticker});

        if (currentWatchlist && stockToRemove) {
            currentWatchlist.watchlist.remove(stockToRemove);
            em.persistAndFlush(currentWatchlist);
            return true;
        }

        else {
            return false;
        }
        
    }

    // TODO: Add market specification so as to avoid ticker conflict.
    // TODO: Way better error handling, this is a MVP.
    @Mutation(() => Boolean)
    async removeFromPortfolio(
        @Arg('ticker') ticker: string,
        @Ctx() {req,em}: IsoContext
    ) {
        const currentPortfolio = await em.findOne(Portfolio, {id: req.session.userID});

        const stockToRemove = await em.findOne(Stocks, {symbol: ticker});

        if (currentPortfolio && stockToRemove) {
            currentPortfolio.portfolio.remove(stockToRemove);
            em.persistAndFlush(currentPortfolio);
            return true;
        }

        else {
            return false;
        }
        
    }

    // TODO: Way better error handling, this is a MVP.
    @Query(() => [String])
    async readPortfolio(
        @Ctx() {req,em} : IsoContext
    ) {
    
        var tickers = [];
        const currentPortfolio = await em.findOne(Portfolio, {id: req.session.userID});
        const instrinsicPortfolio = currentPortfolio?.portfolio;
        for (const stockObject of instrinsicPortfolio!) {

                const ticker = await(em.findOne(Stocks, {id: stockObject.id}));
                tickers.push(ticker?.symbol);
            }
        return tickers;
    }

    @Query(() => [String])
    async readWatchlist(
        @Ctx() {req,em} : IsoContext
    ) {
    
        var tickers = [];
        const currentWatchlist = await em.findOne(Watchlist, {id: req.session.userID});
        const instrinsicWatchlist = currentWatchlist?.watchlist;
        for (const stockObject of instrinsicWatchlist!) {

                const ticker = await(em.findOne(Stocks, {id: stockObject.id}));
                tickers.push(ticker?.symbol);
        }
        return tickers;
    }
    @Query(() =>  [securityOverview])
    async overview(
        @Arg('ticker') ticker: string,
        @Ctx() {em} : IsoContext
    ){
        const checkForOverview = await em.findOne(securityOverview, {symbol: ticker.toUpperCase()})
        if(!checkForOverview) {
            console.log("Overview not found")
            const response = await axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker.toUpperCase()}/company?&apiKey=Mr8kP5Aowd0r3A0OTj9H6fonc8_yAbdN`)
            const newOverview = em.create(securityOverview,{
                symbol: response.data.symbol,
                name: response.data.name,
                description : response.data.description,
                exchange: response.data.exchange,
                industry: response.data.industry,
                sector: response.data.sector,
            });
            try {await em.persistAndFlush(newOverview)}
            catch(e){
                console.log(e)
            };
            return [newOverview];            
        }
        else{
            return [checkForOverview];
        }

    }

    @Mutation (() => SearchResponse)
    async searchEquities(
        @Arg("symbol") symbol: String,
        @Ctx() {req, em} : IsoContext
    ){
        const user = em.findOne(Users, {id: req.session.userID})
        if (!user){
            return {
                error: [{
                    field: "User",
                    message: "Request not authorised. Please log in."
                }]
            }
        }
        else {
            try {
                const response = await axios.get(
                    `https://sandbox.iexapis.com/stable/search/${symbol.toLowerCase()}?token=Tsk_12a652ebe24b4421a3401e1a649f418c`
                    )
                console.log(response.data)
                return {
                    error: [],
                    results:response.data
                }}
            catch (e){
                return {
                    error: [{
                        field: "",
                        message: e.toString()
                    }]
                }
            }
        }
    }

    @Query(() => GraphQLJSONObject)
    async newsQuery(
        @Ctx() {req, em}: IsoContext
    ){
        var stocks: string[] = [];
        const response:any = [];
        const user = em.findOne(Users, {id: req.session.userID});
        if (!user){
            return 'User not authorised'
        }
        else {
            const portfolio = await em.findOne(Portfolio, {id: req.session.userID});

            if(portfolio?.portfolio.length ===0){
                const starter = [
                    {
                    "datetime": 1545215400000,
                    "headline": "add some stocks to your watchlist to get relevant news!",
                    "source": "isohel.co.uk",
                    "url": "isohel.co.uk",
                    "summary": "isohel sources news related to the things you're interested in.",
                    "related": "AAPL,AMZN,GOOG,GOOGL,MSFT",
                    "image": "https://cloud.iexapis.com/stable/news/image/7594023985414148",
                    "lang": "en",
                    "hasPaywall": true,
                    },
                    {
                    "datetime": 1545215400000,
                    "headline": "add some stocks to your watchlist to get relevant news!",
                    "source": "isohel.co.uk",
                    "url": "isohel.co.uk",
                    "summary": "isohel sources news related to the things you're interested in.",
                    "related": "AAPL,AMZN,GOOG,GOOGL,MSFT",
                    "image": "https://cloud.iexapis.com/stable/news/image/7594023985414148",
                    "lang": "en",
                    "hasPaywall": true,
                    },
            ]
                response.push(starter);
                return {response}
            }
            for (const stock of portfolio!.portfolio){
                const ticker = await em.findOne(Stocks, {id: stock.id})
                stocks.push(ticker!.symbol)
            }
            for (const ticker of stocks){
                const newsResponse = await axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/news?token=Tsk_12a652ebe24b4421a3401e1a649f418c`);
                response.push(newsResponse.data);
            }
            return {response}
            
        }
        
    }

    @Query(() => GraphQLJSONObject)
    async getPrice(
        @Arg('ticker') ticker: string
    ) {
        // 116 KEY
        const price = await axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_5944510d86bc4c12a137145ee3239b62`)
        return price.data;
    }

    @Query(() => GraphQLJSONObject)
    async sectorPerformance(){
        // TRISTAN API KEY
        const sectors = await axios.get('https://sandbox.iexapis.com/stable/stock/market/sector-performance?token=Tpk_8b82ce782a7b4219a1e2108596c7bace')
        const response = sectors.data
        return {response};
    }

    @Query(() => GraphQLJSONObject)
    async topPerformers(){
        // DIFFERENT API KEY
        const gainers = await axios.get('https://sandbox.iexapis.com/stable/stock/market/list/gainers?token=Tsk_6e697feab5e2495b9ab715ada8e5e51c')
        const response = gainers.data
        return {response};
    }

    @Query(() => GraphQLJSONObject)
    async topLosers(){
        // 909 API KEY
        const losers = await axios.get('https://sandbox.iexapis.com/stable/stock/market/list/losers?token=Tpk_8cd345358a514a7b9e78dfa602a4fa41')
        const response = losers.data
        return {response};
    }



    // @Query(() => GraphQLJSONObject)
    // async pricePrediction(
    //     @Arg('ticker') ticker: strng
    // ) {

    // Send a request to the prediction service and return the JSON formatted file.
    // }
}