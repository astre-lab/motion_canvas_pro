import { MetaField } from '@motion-canvas/core';
import { useSubscribableValue } from '../../hooks/index.ts';
import { Group, Label } from '../controls/index.ts';
import { AutoField } from '../fields/index.ts';

export interface UnknownMetaFieldViewProps {
  field: MetaField<any>;
}

export function UnknownMetaFieldView({ field }: UnknownMetaFieldViewProps) {
  const value = useSubscribableValue(field.onChanged);

  return (
    <Group>
      <Label>{field.name}</Label>
      <AutoField value={value} />
    </Group>
  );
}
