import { BellIcon } from '@chakra-ui/icons';
import { Box, HStack, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { useSearch } from '../../../hooks/useSearch';
import { formatDate, getEventsForDay } from '../../../utils/dateUtils';

export const MonthlyTableRow: React.FC<{
  week: (number | null)[];
  currentDate: Date;
  holidays: { [key: string]: string };
}> = ({ week, currentDate, holidays }) => {
  const { notifiedEvents } = useNotifications();
  const { filteredEvents } = useSearch();

  return (
    <Tr>
      {week.map((day, dayIndex) => {
        const dateString = day ? formatDate(currentDate, day) : '';
        const holiday = holidays[dateString];

        return (
          <Td key={dayIndex} height="100px" verticalAlign="top" width="14.28%" position="relative">
            {day && (
              <>
                <Text fontWeight="bold">{day}</Text>
                {holiday && (
                  <Text color="red.500" fontSize="sm">
                    {holiday}
                  </Text>
                )}
                {getEventsForDay(filteredEvents, day).map((event) => {
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
              </>
            )}
          </Td>
        );
      })}
    </Tr>
  );
};
