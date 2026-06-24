import { ImageExporter } from '../app/index.ts';
import { makePlugin } from './makePlugin.ts';

/**
 * The default plugin included in every Motion Canvas project.
 *
 * @internal
 */
export default makePlugin({
  name: '@motion-canvas/core/default',
  exporters() {
    return [ImageExporter];
  },
});
