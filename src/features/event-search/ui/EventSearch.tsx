import { VStack } from '@chakra-ui/react';
import React from 'react';

import { SearchedEventBox } from './SearchedEventBox';
import { SearchForm } from './SearchForm';
import { useCalendarView } from '../../../hooks/useCalendarView';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSearch } from '../../../hooks/useSearch';
import { NoSuchDataText } from '../../../shared/ui/NoSuchDataText';
import { Event } from '../../../types';

export const EventSearch: React.FC<{
  events: Event[];
  editEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}> = ({ events, editEvent, deleteEvent }) => {
  const { view, currentDate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);
  const { notifiedEvents } = useNotifications();
  const hasSearchedEvent = filteredEvents.length > 0;

  return (
    <VStack data-testid="event-list" w="500px" h="full" overflowY="auto">
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {hasSearchedEvent ? (
        filteredEvents.map((event) => (
          <SearchedEventBox
            key={event.id}
            event={event}
            notifiedEvents={notifiedEvents}
            editEvent={editEvent}
            deleteEvent={deleteEvent}
          />
        ))
      ) : (
        <NoSuchDataText />
      )}
    </VStack>
  );
};
