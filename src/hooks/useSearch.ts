import { useAtom, useAtomValue } from 'jotai';

import { searchTermAtom } from '../entities/calendar/model/Calendar';
import { filteredEventsAtom } from '../features/event-search/model/Search';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const filteredEvents = useAtomValue(filteredEventsAtom);

  return {
    searchTerm,
    setSearchTerm,
    filteredEvents,
  };
};
