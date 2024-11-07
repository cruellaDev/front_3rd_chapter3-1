import { BellIcon } from '@chakra-ui/icons';
import { Box, HStack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';

import { WeekDaysTableHead } from './WeekDaysTableHead';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSearch } from '../../../hooks/useSearch';
import { getWeekDates } from '../../../utils/dateUtils';

export const WeeklyTable: React.FC<{ currentDate: Date }> = ({ currentDate }) => {
  const { notifiedEvents } = useNotifications();
  const { filteredEvents } = useSearch();
  const weekDates = getWeekDates(currentDate);
  return (
    <Table variant="simple" w="full">
      <WeekDaysTableHead />
      <Tbody>
        <Tr>
          {weekDates.map((date) => (
            <Td key={date.toISOString()} height="100px" verticalAlign="top" width="14.28%">
              <Text fontWeight="bold">{date.getDate()}</Text>
              {filteredEvents
                .filter((event) => new Date(event.date).toDateString() === date.toDateString())
                .map((event) => {
                  const isNotified = notifiedEvents.includes(event.id);
                  return (
                    <Box
                      key={event.id}
                      p={1}
                      my={1}
                      bg={isNotified ? 'red.100' : 'gray.100'}
                      borderRadius="md"
                      fontWeight={isNotified ? 'bold' : 'normal'}
                      color={isNotified ? 'red.500' : 'inherit'}
                    >
                      <HStack spacing={1}>
                        {isNotified && <BellIcon />}
                        <Text fontSize="sm" noOfLines={1}>
                          {event.title}
                        </Text>
                      </HStack>
                    </Box>
                  );
                })}
            </Td>
          ))}
        </Tr>
      </Tbody>
    </Table>
  );
};
