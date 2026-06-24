import type { BoolMetaField } from '@motion-canvas/core';
import { useSubscribableValue } from '../../hooks/index.ts';
import { Checkbox } from '../controls/index.ts';
import { MetaFieldGroup } from './MetaFieldGroup.tsx';

export interface BoolMetaFieldViewProps {
  field: BoolMetaField;
}

export function BoolMetaFieldView({ field }: BoolMetaFieldViewProps) {
  const value = useSubscribableValue(field.onChanged);

  return (
    <MetaFieldGroup field={field}>
      <Checkbox
        checked={value}
        onChange={() => {
          field.set(!value);
        }}
      />
    </MetaFieldGroup>
  );
}
