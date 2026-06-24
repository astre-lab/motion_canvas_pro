import { useApplication } from '../../contexts/index.ts';
import { Expandable } from '../fields/index.ts';
import { MetaFieldView } from '../meta/index.ts';
import { Pane } from '../tabs/index.ts';

export function Settings() {
  const { settings } = useApplication();

  return (
    <Pane title='Settings' id='app-settings-pane'>
      <Expandable title={settings.appearance.name} open>
        <MetaFieldView field={settings.appearance} />
      </Expandable>
      <Expandable title={settings.defaults.name}>
        <MetaFieldView field={settings.defaults} />
      </Expandable>
    </Pane>
  );
}
