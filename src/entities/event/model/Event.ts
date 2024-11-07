import { RepeatType } from '../../../types';
import { periodTypes } from '../config';

export function getPeriodByRepeat(repeat: RepeatType): string {
  return periodTypes[repeat];
}
