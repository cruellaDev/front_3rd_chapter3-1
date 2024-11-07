import { VStack } from '@chakra-ui/react';

import { NotificationAlertView } from './NotificationAlertView';
import { useNotifications } from '../../../hooks/useNotifications';

export const NotificationAlerts = () => {
  const { notifications, removeNotification } = useNotifications();

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
