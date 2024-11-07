import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { getPeriodByRepeat } from '../../../entities/event/model/Event';
import { NotificationHighlighter } from '../../../entities/notification/ui/NotificationHighliter';
import { NotificationTimeLabelText } from '../../../entities/notification/ui/NotificationTimeLabelText';
import { Event } from '../../../types';
import { EventDeleteButton } from '../../event-delete/ui/EventDeleteButton';
import { EventEditButton } from '../../event-edit/ui/EventEditButton';

export const SearchedEventBox: React.FC<{
  event: Event;
  notifiedEvents: string[];
  editEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}> = ({ event, notifiedEvents, editEvent, deleteEvent }) => {
  return (
    <Box borderWidth={1} borderRadius="lg" p={3} width="100%">
      <HStack justifyContent="space-between">
        <VStack align="start">
          <NotificationHighlighter
            notifiedEvents={notifiedEvents}
            id={event.id}
            text={event.title}
          />
          <Text>{event.date}</Text>
          <Text>
            {event.startTime} - {event.endTime}
          </Text>
          <Text>{event.description}</Text>
          <Text>{event.location}</Text>
          <Text>카테고리: {event.category}</Text>
          {event.repeat.type !== 'none' && (
            <Text>
              반복: {event.repeat.interval}
              {event.repeat.type && getPeriodByRepeat(event.repeat.type)}
              마다
              {event.repeat.endDate && ` (종료: ${event.repeat.endDate})`}
            </Text>
          )}
          <NotificationTimeLabelText notificationTime={event.notificationTime} />
        </VStack>
        <HStack>
          <EventEditButton event={event} editEvent={editEvent} />
          <EventDeleteButton event={event} deleteEvent={deleteEvent} />
        </HStack>
      </HStack>
    </Box>
  );
};
