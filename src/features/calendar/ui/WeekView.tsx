import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';

import { WeeklyTable } from './WeeklyTable';
import { formatWeek } from '../../../utils/dateUtils';

export const WeekView: React.FC<{ currentDate: Date }> = ({ currentDate }) => {
  return (
    <VStack data-testid="week-view" align="stretch" w="full" spacing={4}>
      <Heading size="md">{formatWeek(currentDate)}</Heading>
      <WeeklyTable currentDate={currentDate} />
    </VStack>
  );
};
