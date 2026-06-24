import { MetaField } from './MetaField.ts';
import { MetaOption } from './MetaOption.ts';

/**
 * Represents a string stored in a meta file.
 */
export class StringMetaField<T extends string = string> extends MetaField<T> {
  public readonly type = String;
  protected presets: MetaOption<T>[] = [];

  public getPresets() {
    return this.presets;
  }

  public setPresets(options: MetaOption<T>[]): this {
    this.presets = options;
    return this;
  }
}
