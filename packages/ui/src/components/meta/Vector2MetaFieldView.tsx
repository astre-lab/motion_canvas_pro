import { Vector2MetaField } from '@motion-canvas/core';
import { useSubscribableValue } from '../../hooks/index.ts';
import { NumberInput } from '../controls/index.ts';
import { MetaFieldGroup } from './MetaFieldGroup.tsx';

export interface Vector2MetaFieldViewProps {
  field: Vector2MetaField;
}

export function Vector2MetaFieldView({ field }: Vector2MetaFieldViewProps) {
  const value = useSubscribableValue(field.onChanged);

  return (
    <MetaFieldGroup field={field}>
      <NumberInput value={value.x} onChange={(x) => field.set([x, value.y])} />
      <NumberInput value={value.y} onChange={(y) => field.set([value.x, y])} />
    </MetaFieldGroup>
  );
}
