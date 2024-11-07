import { Box } from '@chakra-ui/react';
import React from 'react';

export const ContainerBox: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      {children}
    </Box>
  );
};
