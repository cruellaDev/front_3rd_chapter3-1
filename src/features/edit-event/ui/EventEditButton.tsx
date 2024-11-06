import { EditIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';

import { useEventForm } from '../../../hooks/useEventForm';
import { Event } from '../../../types';

export const EventEditButton: React.FC<{
  event: Event;
}> = ({ event }) => {
  const { editEvent } = useEventForm();

  return (
    <IconButton aria-label="Edit event" icon={<EditIcon />} onClick={() => editEvent(event)} />
  );
};
