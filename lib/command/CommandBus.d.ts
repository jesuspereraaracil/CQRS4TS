import type { CommandHandler } from '@/command/CommandHandler';
import { type Command } from '@/command/Command';
export declare class CommandBus {
    private static _INSTANCE;
    private readonly map;
    static get INSTANCE(): CommandBus;
    private constructor();
    registerHandler<P = unknown>(handler: CommandHandler<Command<P>>): void;
    execute<P>(command: Command<P>): Promise<void>;
}
