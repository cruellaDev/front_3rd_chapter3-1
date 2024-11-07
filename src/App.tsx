import { useState } from 'react';

import { ScheduleCalendar } from './features/calendar/ui/ScheduleCalendar.tsx';
import { EventAddOrUpdateForm } from './features/event-form/ui/EventAddOrUpdateForm.tsx';
import { EventOverlapAlertDialog } from './features/event-overlap/EventOverlapAlertDialog.tsx';
import { EventSearch } from './features/event-search/ui/EventSearch.tsx';
import { NotificationProvider } from './features/notification/model/NotificationProvider.tsx';
import { NotificationAlerts } from './features/notification/ui/NotificationAlerts.tsx';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';
import { Event } from './types';
import { ContainerBox } from './widget/ui/ContainerBox.tsx';
import { FlexibleSection } from './widget/ui/FlexiableSection.tsx';

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventOperations();
  const { editEvent } = useEventForm();

  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  return (
    <NotificationProvider events={events}>
      <ContainerBox>
        <FlexibleSection>
          {/* 일정 추가/삭제 */}
          <EventAddOrUpdateForm
            events={events}
            setIsOverlapDialogOpen={setIsOverlapDialogOpen}
            setOverlappingEvents={setOverlappingEvents}
            addEvent={addEvent}
            updateEvent={updateEvent}
          />
          {/* 일정 보기 */}
          <ScheduleCalendar />
          {/* 일정 검색 */}
          <EventSearch events={events} editEvent={editEvent} deleteEvent={deleteEvent} />
        </FlexibleSection>

        {/* 일정 겹침 경고 */}
        <EventOverlapAlertDialog
          isOverlapDialogOpen={isOverlapDialogOpen}
          setIsOverlapDialogOpen={setIsOverlapDialogOpen}
          overlappingEvents={overlappingEvents}
          addEvent={addEvent}
          updateEvent={updateEvent}
        />
        {/* 알림 */}
        <NotificationAlerts />
      </ContainerBox>
    </NotificationProvider>
  );
}

export default App;
