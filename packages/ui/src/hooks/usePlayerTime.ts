import { useMemo } from 'preact/hooks';
import { useCurrentFrame } from './useCurrentFrame.ts';
import { useDuration } from './useDuration.ts';
import { usePreviewSettings } from './useSettings.ts';

export function usePlayerTime() {
  const { fps } = usePreviewSettings();
  const frame = useCurrentFrame();
  const duration = useDuration();

  return useMemo(
    () => ({
      frame,
      time: frame / fps,
      duration: duration,
      durationTime: duration / fps,
      completion: frame / duration,
    }),
    [frame, duration, fps],
  );
}
