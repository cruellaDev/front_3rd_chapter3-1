import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

import { useEventForm } from '../../hooks/useEventForm';
import { useEventOperations } from '../../hooks/useEventOperations';
import { Event, EventForm } from '../../types';

export const EventOverlapAlertDialog: React.FC<{
  isOverlapDialogOpen: boolean;
  setIsOverlapDialogOpen: (value: boolean) => void;
  overlappingEvents: Event[];
}> = ({ isOverlapDialogOpen, setIsOverlapDialogOpen, overlappingEvents }) => {
  const { addEvent, updateEvent } = useEventOperations();
  const {
    title,
    date,
    startTime,
    endTime,
    description,
    location,
    category,
    isRepeating,
    repeatType,
    repeatInterval,
    repeatEndDate,
    notificationTime,
    editingEvent,
    setEditingEvent,
  } = useEventForm();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const isEditing = !!editingEvent;

  const handleKeepGoing = async () => {
    setIsOverlapDialogOpen(false);
    const eventData: EventForm = {
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      repeat: {
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      notificationTime,
    };
    if (isEditing) {
      await updateEvent({ ...eventData, id: editingEvent.id }, () => setEditingEvent(null));
    } else {
      await addEvent(eventData), () => setEditingEvent(null);
    }
  };

  return (
    <AlertDialog
      isOpen={isOverlapDialogOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOverlapDialogOpen(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            일정 겹침 경고
          </AlertDialogHeader>

          <AlertDialogBody>
            다음 일정과 겹칩니다:
            {overlappingEvents.map((event) => (
              <Text key={event.id}>
                {event.title} ({event.date} {event.startTime}-{event.endTime})
              </Text>
            ))}
            계속 진행하시겠습니까?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOverlapDialogOpen(false)}>
              취소
            </Button>
            <Button colorScheme="red" onClick={handleKeepGoing} ml={3}>
              계속 진행
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
