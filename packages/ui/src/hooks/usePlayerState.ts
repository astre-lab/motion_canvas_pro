import { useApplication } from '../contexts/index.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function usePlayerState() {
  const { player } = useApplication();
  return useSubscribableValue(player.onStateChanged);
}
