/* eslint-disable @typescript-eslint/no-unused-vars */

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { PlaybackManager, PlaybackStatus } from '../app/index.ts';
import { waitFor } from '../flow/index.ts';
import { endPlayback, startPlayback, useTime } from '../utils/index.ts';
import { cancel } from './cancel.ts';
import { join } from './join.ts';
import { threads } from './threads.ts';

describe('cancel()', () => {
  const playback = new PlaybackManager();
  const status = new PlaybackStatus(playback);
  beforeAll(() => startPlayback(status));
  afterAll(() => endPlayback(status));

  test('Elapsed time when canceling a thread', () => {
    let time = NaN;
    const task = threads(function* () {
      const waitTask = yield waitFor(2);
      cancel(waitTask);
      yield* join(waitTask);
      time = useTime();
    });

    playback.fps = 10;
    playback.frame = 0;
    for (const _ of task) {
      playback.frame++;
    }

    expect(time).toBeCloseTo(0);
  });
});
