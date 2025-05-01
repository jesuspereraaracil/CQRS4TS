import type { Command } from './command';

export type CommandHandler<C extends Command<T>, T = unknown> = {
  execute(command: C): Promise<void>;
};
