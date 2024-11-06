import { Text } from '@chakra-ui/react';
import React from 'react';

import { notificationOptions } from '../config';

export const NotificationTimeLabelText: React.FC<{
  notificationTime: number;
}> = ({ notificationTime }) => {
  const label = notificationOptions.find((option) => option.value === notificationTime)?.label;
  return <Text>알림: {label}</Text>;
};
