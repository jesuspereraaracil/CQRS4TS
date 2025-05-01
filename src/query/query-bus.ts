import type { Query } from './query';
import type { QueryHandler } from './query-handler';
import type { QueryResponse } from './query-response';

export class QueryBus {
  private static readonly _INSTANCE: QueryBus = new QueryBus();
  private readonly _handlers: Map<symbol, QueryHandler<Query<unknown>>> =
    new Map();
  private constructor() {}

  public static addHandler<T>(
    symbol: symbol,
    handler: QueryHandler<Query<T>>,
  ): void {
    QueryBus._INSTANCE.registerHandler(symbol, handler);
  }

  public static async handle<T, R>(query: Query<T>): Promise<QueryResponse<R>> {
    return await QueryBus._INSTANCE.processQuery(query);
  }

  private registerHandler<T>(
    symbol: symbol,
    handler: QueryHandler<Query<T>>,
  ): void {
    if (this._handlers.has(symbol)) {
      throw new Error(
        `Handler already registered for symbol: ${symbol.toString()}`,
      );
    }
    this._handlers.set(symbol, handler as QueryHandler<Query<unknown>>);
  }

  private async processQuery<T, R>(
    query: Query<T>,
  ): Promise<QueryResponse<R>> {
    const handler = this._handlers.get(query.symbol);
    if (!handler) {
      throw new Error(
        `No handler found for symbol: ${query.symbol.toString()}`,
      );
    }
    return (handler as QueryHandler<Query<T>, T, R>).execute(query);
  }
}
