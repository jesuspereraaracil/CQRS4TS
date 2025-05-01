import type { Message } from '@/common/message';

export interface Command<T = unknown> extends Message {
  payload: T;
}
