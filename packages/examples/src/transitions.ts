import { makeProject } from '@motion-canvas/core';

import first from './scenes/transitions-first.tsx';
import second from './scenes/transitions-second.tsx';

export default makeProject({
  scenes: [first, second],
});
