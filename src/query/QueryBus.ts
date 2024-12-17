import type { QueryHandler } from '@/query/QueryHandler';
import type { Query } from '@/query/Query';

export class QueryBus {
  private static _INSTANCE: QueryBus | undefined = undefined;

  private readonly map: Map<string, QueryHandler<Query<unknown>, unknown>>;

  public static get INSTANCE() {
    if (!QueryBus._INSTANCE) {
      QueryBus._INSTANCE = new QueryBus();
    }
    return QueryBus._INSTANCE;
  }

  private constructor() {
    this.map = new Map();
  }

  registerHandler<R, P = unknown>(handler: QueryHandler<Query<P>, R>): void {
    this.map.set(handler.type, handler);
  }

  execute<P, R>(query: Query<P>): Promise<R> {
    const qh = this.map.get(query.name) as QueryHandler<Query<P>, R> | undefined;

    if (!qh) {
      return Promise.reject(new Error(`No query handler for ${query.name}`));
    }

    return qh.execute(query);
  }
}
