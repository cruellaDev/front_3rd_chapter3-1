// import { useInterval } from '@chakra-ui/react';
import {
  useContext,
  //  useState
} from 'react';

// import { Notification, removeFromNotifications } from '../entities/notification/model/Notificaion';
import { NotificationContext } from '../features/notification/model/NotificationContext';
// import { Event } from '../types';
// import { createNotificationMessage, getUpcomingEvents } from '../utils/notificationUtils';

/*
export const useNotifications = (events: Event[]) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifiedEvents, setNotifiedEvents] = useState<string[]>([]);

  const checkUpcomingEvents = () => {
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
  };

  const removeNotification = (index: number) => {
    setNotifications((prev) => removeFromNotifications(prev, index));
  };

  useInterval(checkUpcomingEvents, 1000); // 1초마다 체크

  return { notifications, notifiedEvents, setNotifications, removeNotification };
};
*/

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
