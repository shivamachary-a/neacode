import { cacheExchange } from "@urql/core";
import { dedupExchange, fetchExchange } from "urql";




export const createURQLclient = (ssrExchange: any) => ({
    url: 'http://isohel.co.uk/api/graphql',
  exchanges: [dedupExchange, cacheExchange,
    
ssrExchange,
fetchExchange],
  fetchOptions: {
    credentials: 'include' as const
  }
});