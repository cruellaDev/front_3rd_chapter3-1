import { Alert, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import React from 'react';

import { Notification } from '../../../entities/notification/model/Notificaion';

export const NotificationAlertView: React.FC<{
  notification: Notification;
  closeAlert: () => void;
}> = ({ notification, closeAlert }) => {
  return (
    <Alert status="info" variant="solid" width="auto">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
      </Box>
      <CloseButton onClick={closeAlert} />
    </Alert>
  );
};
