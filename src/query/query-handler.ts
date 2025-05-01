import type { Query } from './query';
import type { QueryResponse } from './query-response';

export type QueryHandler<Q extends Query<T>, T = unknown, R = unknown> = {
  execute(query: Q): Promise<QueryResponse<R>>;
};
