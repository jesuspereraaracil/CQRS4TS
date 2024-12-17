import type { QueryHandler } from '@/query/QueryHandler';
import type { Query } from '@/query/Query';
export declare class QueryBus {
    private static _INSTANCE;
    private readonly map;
    static get INSTANCE(): QueryBus;
    private constructor();
    registerHandler<R, P = unknown>(handler: QueryHandler<Query<P>, R>): void;
    execute<P, R>(query: Query<P>): Promise<R>;
}
