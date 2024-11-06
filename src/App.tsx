import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { ScheduleCalendar } from './features/calendar/ui/ScheduleCalendar.tsx';
import { EventAddOrUpdateForm } from './features/event-form/ui/EventAddOrUpdateForm.tsx';
import { EventOverlapAlertDialog } from './features/event-overlap/EventOverlapAlertDialog.tsx';
import { EventSearch } from './features/event-search/ui/EventSearch.tsx';
import { NotificationAlerts } from './features/notification/ui/NotificationAlerts.tsx';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';
import { Event } from './types';

function App() {
  const { editingEvent, setEditingEvent } = useEventForm();

  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        {/* 일정 추가/삭제 */}
        <EventAddOrUpdateForm
          events={events}
          setIsOverlapDialogOpen={setIsOverlapDialogOpen}
          setOverlappingEvents={setOverlappingEvents}
          saveEvent={saveEvent}
        />
        {/* 일정 보기 */}
        <ScheduleCalendar />
        {/* 일정 검색 */}
        <EventSearch events={events} deleteEvent={deleteEvent} />
      </Flex>

      {/* 일정 겹침 경고 */}
      <EventOverlapAlertDialog
        isOverlapDialogOpen={isOverlapDialogOpen}
        setIsOverlapDialogOpen={setIsOverlapDialogOpen}
        overlappingEvents={overlappingEvents}
        saveEvent={saveEvent}
      />
      {/* 알림 */}
      <NotificationAlerts events={events} />
    </Box>
  );
}

export default App;
