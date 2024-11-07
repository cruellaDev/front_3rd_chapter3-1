import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Event, RepeatInfo } from '../../../types';

const initialFormState = {
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  description: '',
  location: '',
  category: '',
  notificationTime: 0,
};

const initalFormRepeatState: RepeatInfo = {
  type: 'none',
  interval: 1,
  endDate: '',
};

export const formAtom = atomWithReset(initialFormState);
export const formRepeatAtom = atomWithReset<RepeatInfo>(initalFormRepeatState);
export const editingEventAtom = atom<Event | null>(null);
