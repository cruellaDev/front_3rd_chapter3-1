import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { getUpcomingEvents } from '../../../utils/notificationUtils';
import { eventsAtom } from '../../event/model/Event';

export interface Notification {
  id: string;
  message: string;
}

export function removeFromNotifications(notificationList: Notification[], index: number) {
  return notificationList.filter((_, i) => i !== index);
}

export const notifiedEventsAtom = atomWithStorage<string[]>('notifiedEvents', []);

export const upcomingEventsAtom = atom((get) => {
  const events = get(eventsAtom);
  const notifiedEvents = get(notifiedEventsAtom);
  const now = new Date();
  return getUpcomingEvents(events, now, notifiedEvents);
});
