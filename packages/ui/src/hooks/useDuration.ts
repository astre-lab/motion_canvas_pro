import { useApplication } from '../contexts/index.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function useDuration() {
  const { player } = useApplication();
  return useSubscribableValue(player.onDurationChanged);
}
