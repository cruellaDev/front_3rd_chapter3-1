// import { useInterval } from '@chakra-ui/react';
import { useAtomValue, useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import {
  Notification,
  notifiedEventsAtom,
  removeFromNotifications,
  upcomingEventsAtom,
} from '../entities/notification/model/Notificaion';
import { createNotificationMessage } from '../utils/notificationUtils';

export const useNotifications = () => {
  const upcomingEvents = useAtomValue(upcomingEventsAtom);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifiedEvents, setNotifiedEvents] = useAtom(notifiedEventsAtom);

  const removeNotification = useCallback((index: number) => {
    setNotifications((prev) => removeFromNotifications(prev, index));
  }, []);

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      setNotifications((prev) => [
        ...prev,
        ...upcomingEvents.map((event) => ({
          id: event.id,
          message: createNotificationMessage(event),
        })),
      ]);

      setNotifiedEvents((prev) => [...prev, ...upcomingEvents.map(({ id }) => id)]);
    }
  }, [setNotifiedEvents, upcomingEvents]);

  return { notifications, notifiedEvents, removeNotification };
};
