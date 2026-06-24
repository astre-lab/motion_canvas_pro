import { VNode } from 'preact';
import { usePlayerTime } from '../../hooks/index.ts';

interface CurrentTimeProps {
  render: (time: number) => VNode<unknown>;
}

export function CurrentTime({ render }: CurrentTimeProps) {
  const time = usePlayerTime();

  return render(time.frame);
}
