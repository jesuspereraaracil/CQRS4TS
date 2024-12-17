import { Query } from '@/query/Query';
import type { Handler } from '@/common/Handler';

export type QueryHandler<Q extends Query<P>, R, P = unknown> = Handler<Q, R>;

export const QueryHandlerBuilder = <Q extends Query<P>, R, P = unknown>(
  type: string,
  execute: (query: Q) => Promise<R>,
): QueryHandler<Q, R, P> => ({
  type,
  execute,
});
