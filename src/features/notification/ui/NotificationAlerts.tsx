import { VStack } from '@chakra-ui/react';
import React from 'react';

import { NotificationAlertView } from './NotificationAlertView';
import { useNotifications } from '../../../hooks/useNotifications';
import { Event } from '../../../types';

export const NotificationAlerts: React.FC<{
  events: Event[];
}> = ({ events }) => {
  const { notifications, removeNotification } = useNotifications(events);

  const handleRemoveNotification = (index: number) => {
    removeNotification(index);
  };

  return (
    <>
      {notifications.length > 0 && (
        <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
          {notifications.map((notification, index) => (
            <NotificationAlertView
              key={notification.id}
              notification={notification}
              closeAlert={() => handleRemoveNotification(index)}
            />
          ))}
        </VStack>
      )}
    </>
  );
};
