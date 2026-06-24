import { Color, PossibleColor } from '../types/index.ts';
import { MetaField } from './MetaField.ts';

/**
 * Represents a color stored in a meta file.
 */
export class ColorMetaField extends MetaField<
  PossibleColor | null,
  Color | null
> {
  public readonly type = Color.symbol;

  public override parse(value: PossibleColor | null): Color | null {
    return value === null ? null : new Color(value);
  }

  public override serialize(): PossibleColor | null {
    return this.value.current?.serialize() ?? null;
  }
}
