import { RendererState } from '@motion-canvas/core';
import clsx from 'clsx';
import { useEffect, useState } from 'preact/hooks';
import { useApplication } from '../../contexts/index.ts';
import {
  useSurfaceShortcuts,
  VIEWPORT_SHORTCUTS,
} from '../../contexts/shortcuts.tsx';
import { useDuration, useRendererState } from '../../hooks/index.ts';
import { formatDuration } from '../../utils/index.ts';
import {
  PlaybackControls,
  PlaybackProgress,
  RenderingProgress,
} from '../playback/index.ts';
import { CurrentTime } from '../playback/CurrentTime.tsx';
import { EditorPreview } from './EditorPreview.tsx';
import { StageView } from './StageView.tsx';
import { Timestamp } from './Timestamp.tsx';
import styles from './Viewport.module.scss';

export function Viewport() {
  const state = useRendererState();
  return state === RendererState.Working
    ? <RenderingViewport />
    : <EditorViewport />;
}

function EditorViewport() {
  const shortcutRef = useSurfaceShortcuts<HTMLDivElement>(VIEWPORT_SHORTCUTS);
  const duration = useDuration();

  return (
    <div ref={shortcutRef} className={styles.root}>
      <EditorPreview />
      <PlaybackProgress />
      <div className={styles.playback}>
        <CurrentTime
          render={(time) => (
            <Timestamp
              className={styles.time}
              title='Current time'
              frameTitle='Current frame'
              frame={time}
            />
          )}
        />
        <PlaybackControls />
        <Timestamp
          reverse
          className={styles.duration}
          title='Duration'
          frameTitle='Duration in frames'
          frame={duration}
        />
      </div>
    </div>
  );
}

function RenderingViewport() {
  const { renderer } = useApplication();
  const [estimate, setEstimate] = useState(renderer.estimator.estimate());

  useEffect(() => {
    const id = setInterval(() => {
      setEstimate(renderer.estimator.estimate());
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.root}>
      <StageView
        stage={renderer.stage}
        className={clsx(styles.viewport, styles.renderingPreview)}
      />
      <RenderingProgress />
      <div className={styles.playback}>
        <code
          className={styles.time}
          title='Time elapsed since the rendering started'
        >
          {formatDuration(estimate.elapsed / 1000)}
          <span className={styles.frames}>Elapsed</span>
        </code>
        <div />
        <code
          className={styles.duration}
          title='Estimated time remaining until the rendering is complete'
        >
          <span className={styles.frames}>ETA:</span>
          {formatDuration(estimate.eta / 1000)}
        </code>
      </div>
    </div>
  );
}
