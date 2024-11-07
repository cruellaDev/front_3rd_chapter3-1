import { useState } from 'react';

import { ScheduleCalendar } from './features/calendar/ui/ScheduleCalendar.tsx';
import { EventAddOrUpdateForm } from './features/event-form/ui/EventAddOrUpdateForm.tsx';
import { EventOverlapAlertDialog } from './features/event-overlap/EventOverlapAlertDialog.tsx';
import { EventSearch } from './features/event-search/ui/EventSearch.tsx';
import { NotificationAlerts } from './features/notification/ui/NotificationAlerts.tsx';
import { Event } from './types';
import { ContainerBox } from './widget/ui/ContainerBox.tsx';
import { FlexibleSection } from './widget/ui/FlexiableSection.tsx';

function App() {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  return (
    <ContainerBox>
      <FlexibleSection>
        {/* 일정 추가/삭제 */}
        <EventAddOrUpdateForm
          setIsOverlapDialogOpen={setIsOverlapDialogOpen}
          setOverlappingEvents={setOverlappingEvents}
        />
        {/* 일정 보기 */}
        <ScheduleCalendar />
        {/* 일정 검색 */}
        <EventSearch />
      </FlexibleSection>

      {/* 일정 겹침 경고 */}
      <EventOverlapAlertDialog
        isOverlapDialogOpen={isOverlapDialogOpen}
        setIsOverlapDialogOpen={setIsOverlapDialogOpen}
        overlappingEvents={overlappingEvents}
      />
      {/* 알림 */}
      <NotificationAlerts />
    </ContainerBox>
  );
}

export default App;
