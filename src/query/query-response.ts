import type { Message } from '@/common/message';

export interface QueryResponse<R = unknown> extends Message {
  responseTo: string;
  payload: R;
}
