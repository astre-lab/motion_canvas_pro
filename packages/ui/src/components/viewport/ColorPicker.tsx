import { useRef } from 'preact/hooks';
import { useState } from 'react';
import { useShortcut, VIEWPORT_SHORTCUTS } from '../../contexts/shortcuts.tsx';
import { ButtonCheckbox } from '../controls/ButtonCheckbox.tsx';
import { Colorize } from '../icons/index.ts';

export function ColorPicker() {
  return typeof EyeDropper === 'function' ? <ColorPickerImpl /> : <></>;
}

function ColorPickerImpl() {
  const [active, setActive] = useState(false);
  const isActive = useRef(active);
  const pickColor = async () => {
    if (isActive.current) return;

    try {
      isActive.current = true;
      setActive(true);
      const dropper = new EyeDropper();
      const { sRGBHex } = await dropper.open();
      await globalThis.navigator.clipboard.writeText(sRGBHex);
    } catch (_) {
      // User canceled the operation.
    }

    isActive.current = false;
    setActive(false);
  };

  useShortcut(VIEWPORT_SHORTCUTS, 'colorPicker', pickColor);

  return (
    <ButtonCheckbox
      title="Use color picker [I]"
      checked={active}
      onClick={pickColor}
    >
      <Colorize />
    </ButtonCheckbox>
  );
}
