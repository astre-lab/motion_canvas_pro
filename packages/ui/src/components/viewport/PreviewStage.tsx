import { Stage } from '@motion-canvas/core';
import { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useApplication } from '../../contexts/index.ts';
import {
  usePreviewSettings,
  useSharedSettings,
  useSubscribable,
} from '../../hooks/index.ts';
import { StageView } from './StageView.tsx';

export function PreviewStage(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [stage] = useState(() => new Stage());
  const { player } = useApplication();
  const { size, background } = useSharedSettings();
  const { resolutionScale } = usePreviewSettings();

  useSubscribable(
    player.onRender,
    async () => {
      await stage.render(
        player.playback.currentScene,
        player.playback.previousScene,
      );
    },
    [],
  );

  useEffect(() => {
    stage.configure({ resolutionScale, size, background });
    player.requestRender();
  }, [resolutionScale, size, background, player]);

  return <StageView stage={stage} {...props} />;
}
