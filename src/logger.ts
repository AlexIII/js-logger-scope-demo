import { pino } from 'pino';
import type { MiddlewareHandler } from 'hono';
import { AsyncLocalStorage } from 'async_hooks';

interface LoggerScope {
  path: string;
  requestId: number;
}

const loggerScopeStorage = new AsyncLocalStorage<LoggerScope>();

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level: 'info',
  hooks: {
    logMethod(args, method) {
      const scope = loggerScopeStorage.getStore();
      if (scope) {
        if (typeof args[0] === 'string') {
          args = [`[%s] [Id=%s] ${args[0]}`, scope.path, scope.requestId, ...args.slice(1)];
        }
        if (typeof args[0] === 'object' && typeof args[1] === 'string') {
          args = [args[0], `[%s] [Id=%s] ${args[1]}`, scope.path, scope.requestId, ...args.slice(2)];
        }
      }
      method.apply(this, args);
    },
  },
});

export const useLoggerRequestContext = () => {
  let requestId = 0;
  return ((c, next) => loggerScopeStorage.run({ path: c.req.path, requestId: requestId++ }, next)) as MiddlewareHandler;
};
