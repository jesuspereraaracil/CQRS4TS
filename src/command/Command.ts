import type { Message } from '@/common/Message';

export abstract class Command<P = undefined> implements Message<P> {
  public readonly occurredOn: number;
  protected constructor(
    readonly name: string,
    readonly id: string,
    readonly payload: P,
  ) {
    this.occurredOn = Date.now();
  }

  public toString(): string {
    const occurredOn = new Date(this.occurredOn);
    const year = occurredOn.getUTCFullYear().toString();
    const month = (occurredOn.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = occurredOn.getUTCDate().toString().padStart(2, '0');
    const date = `${year}/${month}/${day}`;

    return `[COMMAND] ${this.name} @ ${date} : ${this.id}${this.payload ? ` | ${typeof this.payload}` : ''}`;
  }
}
