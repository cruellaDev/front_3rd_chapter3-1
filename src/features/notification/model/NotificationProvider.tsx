import { useInterval } from '@chakra-ui/react';
import React, { useState, useCallback, useMemo } from 'react';

import { NotificationContext } from './NotificationContext';
import {
  Notification,
  removeFromNotifications,
} from '../../../entities/notification/model/Notificaion';
import { Event } from '../../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../../utils/notificationUtils';

export const NotificationProvider: React.FC<{
  events: Event[];
  children?: React.ReactNode;
}> = ({ events, children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifiedEvents, setNotifiedEvents] = useState<string[]>([]);

  const checkUpcomingEvents = useCallback(() => {
    const now = new Date();
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);

    setNotifications((prev) => [
      ...prev,
      ...upcomingEvents.map((event) => ({
        id: event.id,
        message: createNotificationMessage(event),
      })),
    ]);

    setNotifiedEvents((prev) => [...prev, ...upcomingEvents.map(({ id }) => id)]);
  }, [events, notifiedEvents]);

  const removeNotification = useCallback((index: number) => {
    setNotifications((prev) => removeFromNotifications(prev, index));
  }, []);

  useInterval(checkUpcomingEvents, 1000); // 1초마다 체크

  const value = useMemo(
    () => ({ notifications, notifiedEvents, setNotifications, removeNotification }),
    [notifications, notifiedEvents, removeNotification]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
