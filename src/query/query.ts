import type { Message } from '../common/message';

export interface Query<T = unknown> extends Message {
  payload: T;
}
