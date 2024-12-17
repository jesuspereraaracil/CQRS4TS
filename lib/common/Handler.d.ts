import type { Message } from '@/common/Message';
export interface Handler<M extends Message<P>, R, P = unknown> {
    type: string;
    execute(message: M): Promise<R>;
}
