import { withLoader } from './withLoader.ts';

export function openOutputPath() {
  return withLoader(async () => {
    await fetch('/__open-output-path');
  });
}
