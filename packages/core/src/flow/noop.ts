import { decorate, threadable } from '../decorators/index.ts';
import { ThreadGenerator } from '../threading/index.ts';

decorate(noop, threadable());
/**
 * Do nothing.
 */
export function* noop(): ThreadGenerator {
  // do nothing
}
