import { VStack } from '@chakra-ui/react';

import { SearchedEventBox } from './SearchedEventBox';
import { SearchForm } from './SearchForm';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSearch } from '../../../hooks/useSearch';
import { NoSuchDataText } from '../../../shared/ui/NoSuchDataText';

export const EventSearch = () => {
  const { filteredEvents } = useSearch();
  const { notifiedEvents } = useNotifications();
  const hasSearchedEvent = filteredEvents.length > 0;

  return (
    <VStack data-testid="event-list" w="500px" h="full" overflowY="auto">
      <SearchForm />

      {hasSearchedEvent ? (
        filteredEvents.map((event) => (
          <SearchedEventBox key={event.id} event={event} notifiedEvents={notifiedEvents} />
        ))
      ) : (
        <NoSuchDataText />
      )}
    </VStack>
  );
};
