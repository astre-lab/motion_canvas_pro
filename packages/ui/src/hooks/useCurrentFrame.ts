import { RendererState } from '@motion-canvas/core';
import { useApplication } from '../contexts/index.ts';
import { useRendererState } from './useRendererState.ts';
import { usePreviewSettings, useRenderingSettings } from './useSettings.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function useCurrentFrame() {
  const { player, renderer } = useApplication();
  const playerFrame = useSubscribableValue(player.onFrameChanged);
  const rendererFrame = useSubscribableValue(renderer.onFrameChanged);
  const rendererState = useRendererState();
  const preview = usePreviewSettings();
  const rendering = useRenderingSettings();

  return rendererState === RendererState.Working
    ? Math.floor((rendererFrame / rendering.fps) * preview.fps)
    : playerFrame;
}
