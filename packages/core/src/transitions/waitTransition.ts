import { waitFor } from '../flow/index.ts';
import { SignalValue } from '../signals/index.ts';
import { ThreadGenerator } from '../threading/index.ts';
import { useTransition } from './useTransition.ts';

/**
 * Perform a transition that doesn't do anything.
 *
 * @remarks
 * This is useful when you want to achieve a transition effect by animating
 * objects in the scenes. It will overlay the scenes on top of each other for
 * the duration of the transition.
 *
 * @param duration - The duration of the transition.
 * @param previousOnTop - Whether the previous scene should be rendered on top.
 */
export function* waitTransition(
  duration = 0.6,
  previousOnTop: SignalValue<boolean> = true,
): ThreadGenerator {
  const endTransition = useTransition(
    () => {
      // do nothing
    },
    undefined,
    previousOnTop,
  );

  yield* waitFor(duration);
  endTransition();
}
