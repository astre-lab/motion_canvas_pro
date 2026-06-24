import { Computed, ComputedContext } from './index.ts';

export function createComputed<TValue>(
  factory: (...args: any[]) => TValue,
  owner?: any,
): Computed<TValue> {
  return new ComputedContext<TValue>(factory, owner).toSignal();
}
