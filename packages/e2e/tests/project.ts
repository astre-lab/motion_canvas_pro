import { makeProject } from '@motion-canvas/core';

import circle from './scenes/circle.tsx';
import rect from './scenes/rect.tsx';

export default makeProject({
  scenes: [circle, rect],
});
