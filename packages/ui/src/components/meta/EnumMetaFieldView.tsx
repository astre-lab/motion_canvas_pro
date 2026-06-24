import type { EnumMetaField } from '@motion-canvas/core';
import { useSubscribableValue } from '../../hooks/index.ts';
import { Select } from '../controls/index.ts';
import { MetaFieldGroup } from './MetaFieldGroup.tsx';

export interface EnumMetaFieldViewProps {
  field: EnumMetaField<any>;
}

export function EnumMetaFieldView({ field }: EnumMetaFieldViewProps) {
  const value = useSubscribableValue(field.onChanged);
  return (
    <>
      <MetaFieldGroup field={field}>
        <Select
          options={field.options}
          value={value}
          onChange={(newValue) => field.set(newValue)}
        />
      </MetaFieldGroup>
    </>
  );
}
