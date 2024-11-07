import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';

import { MonthlyTable } from './MonthlyTable';
import { formatMonth } from '../../../utils/dateUtils';

export const MonthView: React.FC<{
  currentDate: Date;
  holidays: { [key: string]: string };
}> = ({ currentDate, holidays }) => {
  return (
    <VStack data-testid="month-view" align="stretch" w="full" spacing={4}>
      <Heading size="md">{formatMonth(currentDate)}</Heading>
      <MonthlyTable currentDate={currentDate} holidays={holidays} />
    </VStack>
  );
};
