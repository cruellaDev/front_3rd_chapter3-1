import { EditIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';

import { Event } from '../../../types';

export const EventEditButton: React.FC<{
  event: Event;
  editEvent: (event: Event) => void;
}> = ({ event, editEvent }) => {
  return (
    <IconButton aria-label="Edit event" icon={<EditIcon />} onClick={() => editEvent(event)} />
  );
};
