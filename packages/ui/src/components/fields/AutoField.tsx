import { Color, isType, Spacing, Vector2 } from '@motion-canvas/core';
import { FunctionComponent } from 'preact';
import { ArrayField } from './ArrayField.tsx';
import { ColorField } from './ColorField.tsx';
import { NumberField } from './NumberField.tsx';
import { SpacingField } from './SpacingField.tsx';
import { UnknownField } from './UnknownField.tsx';
import { Vector2Field } from './Vector2Field.tsx';

export interface AutoFieldProps {
  value: any;
}

const TYPE_MAP: Record<symbol, FunctionComponent<{ value: any }>> = {
  [Vector2.symbol]: Vector2Field,
  [Color.symbol]: ColorField,
  [Spacing.symbol]: SpacingField,
};

export function AutoField({ value }: AutoFieldProps) {
  let Field = UnknownField;
  if (isType(value)) {
    Field = TYPE_MAP[value.toSymbol()] ?? UnknownField;
  } else if (typeof value === 'number') {
    Field = NumberField;
  } else if (Array.isArray(value)) {
    Field = ArrayField;
  }

  return <Field value={value} />;
}
