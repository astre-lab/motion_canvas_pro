import { useApplication } from '../contexts/index.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function useScenes() {
  const { player } = useApplication();
  return useSubscribableValue(player.playback.onScenesRecalculated);
}

export function useCurrentScene() {
  const { player } = useApplication();
  return useSubscribableValue(player.playback.onSceneChanged);
}
