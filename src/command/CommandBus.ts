import type { CommandHandler } from '@/command/CommandHandler';
import { type Command } from '@/command/Command';
import type { Query } from '@/query/Query';

export class CommandBus {
  private static _INSTANCE: CommandBus | undefined = undefined;

  private readonly map;

  public static get INSTANCE() {
    if (!CommandBus._INSTANCE) {
      CommandBus._INSTANCE = new CommandBus();
    }
    return CommandBus._INSTANCE;
  }

  private constructor() {
    this.map = new Map<string, CommandHandler<Command<unknown>>>();
  }

  registerHandler<P = unknown>(handler: CommandHandler<Command<P>>) {
    this.map.set(handler.type, handler);
  }

  execute<P>(command: Command<P>): Promise<void> {
    const ch = this.map.get(command.name) as CommandHandler<Query<P>> | undefined;

    if (!ch) {
      return Promise.reject(new Error(`No command handler for ${command.name}`));
    }

    return ch.execute(command);
  }
}
