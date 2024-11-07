import { atom } from 'jotai';

import { Event, RepeatType } from '../../../types';
import { periodTypes } from '../config';

export const eventsAtom = atom<Event[]>([]);

export function getPeriodByRepeat(repeat: RepeatType): string {
  return periodTypes[repeat];
}
