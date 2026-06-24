import { useApplication } from '../contexts/index.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function useRendererState() {
  const { renderer } = useApplication();
  return useSubscribableValue(renderer.onStateChanged);
}
