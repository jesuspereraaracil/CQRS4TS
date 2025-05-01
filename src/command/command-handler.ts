import type { Command } from '@/command/command';

export type CommandHandler<C extends Command<T>, T = unknown> = {
  execute(command: C): Promise<void>;
};
