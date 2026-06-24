import { useApplication } from '../contexts/index.ts';
import { useSubscribableValue } from './useSubscribable.ts';

export function usePresenterState() {
  const { presenter } = useApplication();
  return useSubscribableValue(presenter.onStateChanged);
}
