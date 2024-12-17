import type { Message } from '@/common/Message';
export declare abstract class Command<P = undefined> implements Message<P> {
    readonly name: string;
    readonly id: string;
    readonly payload: P;
    readonly occurredOn: number;
    protected constructor(name: string, id: string, payload: P);
    toString(): string;
}
