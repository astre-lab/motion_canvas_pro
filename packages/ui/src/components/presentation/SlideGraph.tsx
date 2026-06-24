import { useApplication } from '../../contexts/index.ts';
import { useSubscribableValue } from '../../hooks/index.ts';
import { Header } from '../layout/index.ts';
import { SceneGroup } from './SceneGroup.tsx';
import styles from './SlideGraph.module.scss';

export function SlideGraph() {
  const { presenter } = useApplication();
  const scenes = useSubscribableValue(presenter.playback.onScenesRecalculated);

  return (
    <div className={styles.root}>
      <Header>SLIDES</Header>
      {scenes.map((scene) => <SceneGroup key={scene.name} scene={scene} />)}
    </div>
  );
}
