import { Table, Tbody } from '@chakra-ui/react';
import React from 'react';

import { MonthlyTableRow } from './MonthlyTableRow';
import { WeekDaysTableHead } from './WeekDaysTableHead';
import { getWeeksAtMonth } from '../../../utils/dateUtils';

export const MonthlyTable: React.FC<{
  currentDate: Date;
  holidays: { [key: string]: string };
}> = ({ currentDate, holidays }) => {
  const weeks = getWeeksAtMonth(currentDate);

  return (
    <Table variant="simple" w="full">
      <WeekDaysTableHead />
      <Tbody>
        {weeks.map((week, weekIndex) => (
          <MonthlyTableRow
            key={weekIndex}
            week={week}
            currentDate={currentDate}
            holidays={holidays}
          />
        ))}
      </Tbody>
    </Table>
  );
};
