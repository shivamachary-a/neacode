
import { Cache, QueryInput } from '@urql/exchange-graphcache';

export function IsohelUpdateQuery<Data, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Data, q: Query) => Query) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}