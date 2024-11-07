import { Th, Thead, Tr } from '@chakra-ui/react';

import { weekDays } from '../../../entities/calendar/config';

export const WeekDaysTableHead = () => {
  return (
    <Thead>
      <Tr>
        {weekDays.map((day) => (
          <Th key={day} width="14.28%">
            {day}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};
