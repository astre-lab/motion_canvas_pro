import { useApplication } from '../contexts/index.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function useSharedSettings() {
  const { meta } = useApplication();
  return useSubscribableValue(meta.shared.onChanged);
}

export function usePreviewSettings() {
  const { meta } = useApplication();
  return useSubscribableValue(meta.preview.onChanged);
}

export function useRenderingSettings() {
  const { meta } = useApplication();
  return useSubscribableValue(meta.rendering.onChanged);
}
