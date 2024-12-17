import type { Handler } from '@/common/Handler';
import type { Command } from '@/command/Command';

export type CommandHandler<C extends Command<P>, P = unknown> = Handler<C, void>;

export const CommandHandlerBuilder = <C extends Command<P>, P = unknown>(
  type: string,
  execute: (command: C) => Promise<void>,
): CommandHandler<C, P> => ({
  type,
  execute,
});
