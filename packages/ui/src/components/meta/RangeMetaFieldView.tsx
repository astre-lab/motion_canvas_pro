import type { RangeMetaField } from '@motion-canvas/core';
import { useApplication } from '../../contexts/index.ts';
import {
  useDuration,
  usePreviewSettings,
  useSubscribableValue,
} from '../../hooks/index.ts';
import { NumberInput } from '../controls/index.ts';
import { MetaFieldGroup } from './MetaFieldGroup.tsx';

export interface RangeMetaFieldViewProps {
  field: RangeMetaField;
}

export function RangeMetaFieldView({ field }: RangeMetaFieldViewProps) {
  const { player } = useApplication();
  const duration = useDuration();
  const range = useSubscribableValue(field.onChanged);
  // We use the preview framerate for all editing purposes.
  const { fps } = usePreviewSettings();

  const startFrame = player.status.secondsToFrames(range[0]);
  const endFrame = player.status.secondsToFrames(range[1]);

  return (
    <MetaFieldGroup field={field}>
      <NumberInput
        min={0}
        max={endFrame}
        value={startFrame}
        onChange={(start) => {
          if (!start || isNaN(start)) {
            start = 0;
          }
          field.update(start, endFrame, duration, fps);
        }}
      />
      <NumberInput
        min={startFrame}
        max={duration}
        placeholder='end'
        value={endFrame >= Infinity ? null : endFrame}
        onChange={(end) => {
          if (!end || isNaN(end)) {
            end = Infinity;
          }
          field.update(startFrame, end, duration, fps);
        }}
      />
    </MetaFieldGroup>
  );
}
