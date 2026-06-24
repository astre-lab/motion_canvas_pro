import type { ThreadGenerator } from '../threading/index.ts';
import { useScene } from './useScene.ts';
import { useThread } from './useThread.ts';

export function* beginSlide(name: string): ThreadGenerator {
  const { slides } = useScene();
  const thread = useThread();
  slides.register(name, thread.fixed);
  yield;

  while (slides.shouldWait(name)) {
    yield;
  }
}
