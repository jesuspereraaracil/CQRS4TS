import type { Command } from './command';
import type { CommandHandler } from './command-handler';

export class CommandBus {
  private static readonly _INSTANCE: CommandBus = new CommandBus();
  private readonly _handlers: Map<symbol, CommandHandler<Command<unknown>>> =
    new Map();
  private constructor() {}

  public static addHandler<T>(
    symbol: symbol,
    handler: CommandHandler<Command<T>>,
  ): void {
    CommandBus._INSTANCE.registerHandler(symbol, handler);
  }

  public static async handle<T>(command: Command<T>): Promise<void> {
    return await CommandBus._INSTANCE.processCommand(command);
  }

  private registerHandler<T>(
    symbol: symbol,
    handler: CommandHandler<Command<T>>,
  ): void {
    if (this._handlers.has(symbol)) {
      throw new Error(
        `Handler already registered for symbol: ${symbol.toString()}`,
      );
    }
    this._handlers.set(symbol, handler as CommandHandler<Command<unknown>>);
  }

  private async processCommand<T>(command: Command<T>): Promise<void> {
    const handler = this._handlers.get(command.symbol);
    if (!handler) {
      throw new Error(
        `No handler found for symbol: ${command.symbol.toString()}`,
      );
    }
    return (handler as CommandHandler<Command<T>>).execute(command);
  }
}
