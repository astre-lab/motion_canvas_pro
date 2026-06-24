import { PresenterState } from '@motion-canvas/core';
import { useEffect } from 'preact/hooks';
import styles from './Editor.module.scss';
import { Console } from './components/console/index.ts';
import { Footer } from './components/footer/index.ts';
import {
  ElementSwitch,
  Navigation,
  ResizeableLayout,
} from './components/layout/index.ts';
import { PresentationMode } from './components/presentation/index.ts';
import { Settings, Threads, VideoSettings } from './components/sidebar/index.ts';
import { Timeline } from './components/timeline/index.ts';
import { Viewport } from './components/viewport/index.ts';
import { usePanels } from './contexts/index.ts';
import { useShortcutContext } from './contexts/shortcuts.tsx';
import { usePresenterState } from './hooks/index.ts';
import { EditorPanel } from './signals/index.ts';

export function Editor() {
  const state = usePresenterState();
  const { sidebar, bottom } = usePanels();
  const { global } = useShortcutContext();

  useEffect(() => {
    global.value = state === PresenterState.Initial ? 'editor' : 'presenter';
  }, [state]);

  return state === PresenterState.Initial
    ? (
      <div className={styles.root}>
        <Navigation />
        <ResizeableLayout
          id={`main-timeline`}
          hidden={bottom.isHidden}
          offset={-160}
          vertical
        >
          <ResizeableLayout
            id={`sidebar-viewport`}
            hidden={sidebar.isHidden}
            offset={400}
          >
            <ElementSwitch
              value={sidebar.current.value}
              cases={{
                [EditorPanel.VideoSettings]: VideoSettings,
                [EditorPanel.Threads]: Threads,
                [EditorPanel.Console]: Console,
                [EditorPanel.Settings]: Settings,
              }}
            />
            <Viewport />
          </ResizeableLayout>
          <ElementSwitch
            value={bottom.current.value}
            cases={{
              [EditorPanel.Timeline]: Timeline,
            }}
          />
        </ResizeableLayout>
        <Footer />
      </div>
    )
    : <PresentationMode />;
}
