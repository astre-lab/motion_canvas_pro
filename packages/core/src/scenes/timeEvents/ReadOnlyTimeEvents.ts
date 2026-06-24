import { ValueDispatcher } from '../../events/index.ts';
import type { Scene } from '../Scene.ts';
import type { TimeEvent } from './TimeEvent.ts';
import type { TimeEvents } from './TimeEvents.ts';

/**
 * Manages time events during rendering and presentation.
 */
export class ReadOnlyTimeEvents implements TimeEvents {
  public get onChanged() {
    return this.events.subscribable;
  }
  private readonly events = new ValueDispatcher<TimeEvent[]>([]);
  private lookup = new Map<string, number>();

  public constructor(private readonly scene: Scene) {
    scene.onReloaded.subscribe(this.handleReload);
  }

  public set() {
    // do nothing
  }

  public register(name: string, initialTime: number): number {
    let duration = this.lookup.get(name);
    if (duration === undefined) {
      const event = this.scene.meta.timeEvents
        .get()
        .find((event) => event.name === name);
      duration = event ? event.targetTime - initialTime : 0;
      this.lookup.set(name, duration);
    }

    return duration;
  }

  /**
   * Called when the parent scene gets reloaded.
   */
  private handleReload = () => {
    this.lookup.clear();
  };
}
