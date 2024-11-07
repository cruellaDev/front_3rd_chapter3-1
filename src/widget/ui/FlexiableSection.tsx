import { Flex } from '@chakra-ui/react';
import React from 'react';

export const FlexibleSection: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex gap={6} h="full">
      {children}
    </Flex>
  );
};
