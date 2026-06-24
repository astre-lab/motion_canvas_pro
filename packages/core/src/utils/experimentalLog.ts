import { LogLevel, LogPayload } from '../app/index.ts';
import experimentalFeatures from './__logs__/experimental-features.md';

export function experimentalLog(message: string, remarks?: string): LogPayload {
  return {
    level: LogLevel.Error,
    message,
    remarks: (remarks ?? '') + experimentalFeatures,
  };
}
