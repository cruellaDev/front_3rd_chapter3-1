import { createContext } from 'react';

import { Notification } from '../../../entities/notification/model/Notificaion';

export interface NotificationContextType {
  notifications: Notification[];
  // eslint-disable-next-line no-unused-vars
  setNotifications: (notification: Notification[]) => void;
  notifiedEvents: string[];
  // eslint-disable-next-line no-unused-vars
  removeNotification: (index: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
