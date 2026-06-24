import type { NumberMetaField } from '@motion-canvas/core';
import { useSubscribableValue } from '../../hooks/index.ts';
import { NumberInput, NumberInputSelect } from '../controls/index.ts';
import { MetaFieldGroup } from './MetaFieldGroup.tsx';

export interface NumberMetaFieldViewProps {
  field: NumberMetaField;
}

export function NumberMetaFieldView({ field }: NumberMetaFieldViewProps) {
  const value = useSubscribableValue(field.onChanged);
  const presets = field.getPresets();
  const precision = field.getPrecision();
  const step = field.getStep();

  return (
    <MetaFieldGroup field={field}>
      {presets.length
        ? (
          <NumberInputSelect
            value={value}
            min={field.getMin()}
            max={field.getMax()}
            onChange={(value) => {
              field.set(value);
            }}
            options={presets}
          />
        )
        : (
          <NumberInput
            value={value}
            decimalPlaces={precision}
            step={step}
            min={field.getMin()}
            max={field.getMax()}
            onChange={(value) => field.set(value)}
          />
        )}
    </MetaFieldGroup>
  );
}
