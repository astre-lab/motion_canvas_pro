import type { MetaField, ObjectMetaField } from '@motion-canvas/core';
import { useSubscribableValue } from '../../hooks/index.ts';
import { MetaFieldView } from './MetaFieldView.tsx';

export interface ObjectMetaFieldViewProps {
  field: ObjectMetaField<any>;
}

export function ObjectMetaFieldView({ field }: ObjectMetaFieldViewProps) {
  const fields: MetaField<any>[] = useSubscribableValue(field.onFieldsChanged);

  return (
    <>
      {fields.map((subfield) => <MetaFieldView field={subfield} />)}
    </>
  );
}
