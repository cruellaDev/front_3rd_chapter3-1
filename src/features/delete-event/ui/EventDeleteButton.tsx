import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';

import { Event } from '../../../types';

export const EventDeleteButton: React.FC<{
  event: Event;
  deleteEvent: (eventId: string) => void;
}> = ({ event, deleteEvent }) => {
  return (
    <IconButton
      aria-label="Delete event"
      icon={<DeleteIcon />}
      onClick={() => deleteEvent(event.id)}
    />
  );
};
