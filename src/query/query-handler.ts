import type { Query } from '@/query/query';
import type { QueryResponse } from '@/query/query-response';

export type QueryHandler<Q extends Query<T>, T = unknown, R = unknown> = {
  execute(query: Q): Promise<QueryResponse<R>>;
};
