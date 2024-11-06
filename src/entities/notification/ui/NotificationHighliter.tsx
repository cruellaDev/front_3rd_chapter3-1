import { BellIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

export const NotificationHighlighter: React.FC<{
  notifiedEvents: string[];
  id: string;
  text: string;
}> = ({ notifiedEvents, id, text }) => {
  const hasNotified = notifiedEvents.includes(id);

  return (
    <HStack>
      {hasNotified && <BellIcon color="red.500" />}
      <Text
        fontWeight={hasNotified ? 'bold' : 'normal'}
        color={hasNotified ? 'red.500' : 'inherit'}
      >
        {text}
      </Text>
    </HStack>
  );
};
