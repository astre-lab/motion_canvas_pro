import type { MetaField } from '@motion-canvas/core';
import {
  Color,
  EnumMetaField,
  RangeMetaField,
  Vector2,
} from '@motion-canvas/core';
import type { FunctionComponent } from 'preact';
import { useSubscribableValue } from '../../hooks/index.ts';
import { Separator } from '../controls/index.ts';
import { BoolMetaFieldView } from './BoolMetaFieldView.tsx';
import { ColorMetaFieldView } from './ColorMetaFieldView.tsx';
import { EnumMetaFieldView } from './EnumMetaFieldView.tsx';
import { NumberMetaFieldView } from './NumberMetaFieldView.tsx';
import { ObjectMetaFieldView } from './ObjectMetaFieldView.tsx';
import { RangeMetaFieldView } from './RangeMetaFieldView.tsx';
import { StringMetaFieldView } from './StringMetaFieldView.tsx';
import { UnknownMetaFieldView } from './UnknownMetaFieldView.tsx';
import { Vector2MetaFieldView } from './Vector2MetaFieldView.tsx';

interface MetaFieldViewProps {
  field: MetaField<any>;
}

type FiledView = FunctionComponent<{ field: MetaField<any> }>;

const TYPE_MAP = new Map<any, FiledView>([
  [Boolean, BoolMetaFieldView],
  [Number, NumberMetaFieldView],
  [String, StringMetaFieldView],
  [EnumMetaField.symbol, EnumMetaFieldView],
  [Color.symbol, ColorMetaFieldView],
  [Vector2.symbol, Vector2MetaFieldView],
  [RangeMetaField.symbol, RangeMetaFieldView],
  [Object, ObjectMetaFieldView],
]);

export function MetaFieldView({ field }: MetaFieldViewProps) {
  const Field: FiledView = TYPE_MAP.get(field.type) ?? UnknownMetaFieldView;
  const disabled = useSubscribableValue(field.onDisabled);

  return disabled ? <></> : (
    <>
      {field.spacing && <Separator />}
      <Field field={field} />
    </>
  );
}
