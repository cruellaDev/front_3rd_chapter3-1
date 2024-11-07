import { atom } from 'jotai';

import {
  currentDateAtom,
  searchTermAtom,
  viewAtom,
} from '../../../entities/calendar/model/Calendar';
import { eventsAtom } from '../../../entities/event/model/Event';
import { getFilteredEvents } from '../../../utils/eventUtils';

export const filteredEventsAtom = atom((get) => {
  const events = get(eventsAtom);
  const searchTerm = get(searchTermAtom);
  const currentDate = get(currentDateAtom);
  const view = get(viewAtom);
  return getFilteredEvents(events, searchTerm, currentDate, view);
});
