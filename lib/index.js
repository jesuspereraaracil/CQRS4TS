// src/query/Query.ts
class Query {
  name;
  id;
  payload;
  occurredOn;
  constructor(name, id, payload) {
    this.name = name;
    this.id = id;
    this.payload = payload;
    this.occurredOn = Date.now();
  }
  toString() {
    const occurredOn = new Date(this.occurredOn);
    const year = occurredOn.getUTCFullYear().toString();
    const month = (occurredOn.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = occurredOn.getUTCDate().toString().padStart(2, "0");
    const date = `${year}/${month}/${day}`;
    return `[QUERY] ${this.name} @ ${date} : ${this.id}${this.payload ? ` | ${typeof this.payload}` : ""}`;
  }
}
// src/query/QueryHandler.ts
var QueryHandlerBuilder = (type, execute) => ({
  type,
  execute
});
// src/query/QueryBus.ts
class QueryBus {
  static _INSTANCE = undefined;
  map;
  static get INSTANCE() {
    if (!QueryBus._INSTANCE) {
      QueryBus._INSTANCE = new QueryBus;
    }
    return QueryBus._INSTANCE;
  }
  constructor() {
    this.map = new Map;
  }
  registerHandler(handler) {
    this.map.set(handler.type, handler);
  }
  execute(query) {
    const qh = this.map.get(query.name);
    if (!qh) {
      return Promise.reject(new Error(`No query handler for ${query.name}`));
    }
    return qh.execute(query);
  }
}
// src/command/Command.ts
class Command {
  name;
  id;
  payload;
  occurredOn;
  constructor(name, id, payload) {
    this.name = name;
    this.id = id;
    this.payload = payload;
    this.occurredOn = Date.now();
  }
  toString() {
    const occurredOn = new Date(this.occurredOn);
    const year = occurredOn.getUTCFullYear().toString();
    const month = (occurredOn.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = occurredOn.getUTCDate().toString().padStart(2, "0");
    const date = `${year}/${month}/${day}`;
    return `[COMMAND] ${this.name} @ ${date} : ${this.id}${this.payload ? ` | ${typeof this.payload}` : ""}`;
  }
}
// src/command/CommandHandler.ts
var CommandHandlerBuilder = (type, execute) => ({
  type,
  execute
});
// src/command/CommandBus.ts
class CommandBus {
  static _INSTANCE = undefined;
  map;
  static get INSTANCE() {
    if (!CommandBus._INSTANCE) {
      CommandBus._INSTANCE = new CommandBus;
    }
    return CommandBus._INSTANCE;
  }
  constructor() {
    this.map = new Map;
  }
  registerHandler(handler) {
    this.map.set(handler.type, handler);
  }
  execute(command) {
    const ch = this.map.get(command.name);
    if (!ch) {
      return Promise.reject(new Error(`No command handler for ${command.name}`));
    }
    return ch.execute(command);
  }
}
export {
  QueryHandlerBuilder,
  QueryBus,
  Query,
  CommandHandlerBuilder,
  CommandBus,
  Command
};
