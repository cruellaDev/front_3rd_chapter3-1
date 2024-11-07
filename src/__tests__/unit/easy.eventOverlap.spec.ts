import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';
import { isInvalidDate } from '../utils';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const testDate = '2024-07-01';
    const testTime = '14:30';
    const result = parseDateTime(testDate, testTime);
    expect(result).toEqual(new Date('2024-07-01 14:30'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const testDate = '2024-12-32';
    const testTime = '09:30';
    const result = parseDateTime(testDate, testTime);
    expect(isInvalidDate(result)).toBe(true);
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const testDate = '2024-02-29';
    const testTime = '34:10';
    const result = parseDateTime(testDate, testTime);
    expect(isInvalidDate(result)).toBe(true);
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const testDate = '';
    const testTime = '00:45';
    const result = parseDateTime(testDate, testTime);
    expect(isInvalidDate(result)).toBe(true);
  });
});

describe('convertEventToDateRange', () => {
  // ! 상식적인 범위의 이벤트 날짜, 시작 시간, 종료시간를 가진 이벤트인 경우~ 면 더 좋겠다.
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const testDate = '2024-01-01';
    const testStartTime = '02:30';
    const testEndTime = '09:30';
    const testEvent: Event = {
      date: testDate,
      startTime: testStartTime,
      endTime: testEndTime,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = convertEventToDateRange(testEvent);
    expect(result.start).toEqual(new Date('2024-01-01 02:30'));
    expect(result.end).toEqual(new Date('2024-01-01 09:30'));
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const testDate = '2024-22-01';
    const testStartTime = '02:30';
    const testEndTime = '09:30';
    const testEvent: Event = {
      date: testDate,
      startTime: testStartTime,
      endTime: testEndTime,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = convertEventToDateRange(testEvent);
    expect(isInvalidDate(result.start)).toBe(true);
    expect(isInvalidDate(result.end)).toBe(true);
  });

  // ! 시간이 시작시간, 종료시간이 나뉘어져 있으니 시작/종료 테스트를 별도로 두는 게 좋겠다.
  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const testDate = '2024-02-01';
    const testStartTime = '99:30';
    const testEndTime = '89:30';
    const testEvent: Event = {
      date: testDate,
      startTime: testStartTime,
      endTime: testEndTime,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = convertEventToDateRange(testEvent);
    expect(isInvalidDate(result.start)).toBe(true);
    expect(isInvalidDate(result.end)).toBe(true);
  });

  // 시작 시간
  it('잘못된 시작 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const testDate = '2024-02-01';
    const testStartTime = '99:30';
    const testEndTime = '09:30';
    const testEvent: Event = {
      date: testDate,
      startTime: testStartTime,
      endTime: testEndTime,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = convertEventToDateRange(testEvent);
    expect(isInvalidDate(result.start)).toBe(true);
  });

  // 종료 시간
  it('잘못된 종료 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const testDate = '2024-02-01';
    const testStartTime = '19:30';
    const testEndTime = '89:30';
    const testEvent: Event = {
      date: testDate,
      startTime: testStartTime,
      endTime: testEndTime,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = convertEventToDateRange(testEvent);
    expect(isInvalidDate(result.end)).toBe(true);
  });
});

describe('isOverlapping', () => {
  const testDate1 = '2024-01-01';
  const testStartTime1 = '02:30';
  const testEndTime1 = '09:30';
  const testEvent1: Event = {
    date: testDate1,
    startTime: testStartTime1,
    endTime: testEndTime1,
    id: 'event1',
    title: 'testEvent',
    category: '업무',
    description: '설명',
    notificationTime: 1,
    repeat: { type: 'none', interval: 0 },
    location: '테스트 장소',
  };
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const testStartTime2 = '01:30';
    const testEndTime2 = '05:30';
    const testEvent2: Event = {
      date: testDate1,
      startTime: testStartTime2,
      endTime: testEndTime2,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = isOverlapping(testEvent1, testEvent2);
    expect(result).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const testStartTime2 = '22:00';
    const testEndTime2 = '23:30';
    const testEvent2: Event = {
      date: testDate1,
      startTime: testStartTime2,
      endTime: testEndTime2,
      id: 'event1',
      title: 'testEvent',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '테스트 장소',
    };
    const result = isOverlapping(testEvent1, testEvent2);
    expect(result).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  const mockEvents: Event[] = [
    {
      date: '2024-02-29',
      startTime: '10:45',
      endTime: '11:00',
      id: 'event1',
      title: 'First Event',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '첫번째 장소',
    },
    {
      date: '2024-03-02',
      startTime: '10:00',
      endTime: '11:00',
      id: 'event2',
      title: 'Second Event',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '두번째 장소',
    },
  ];
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent: Event = {
      date: '2024-03-02',
      startTime: '09:10',
      endTime: '11:30',
      id: 'event4',
      title: 'New Event',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '신규 장소',
    };
    const result = findOverlappingEvents(newEvent, mockEvents);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('event2');
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent: Event = {
      date: '2024-04-01',
      startTime: '15:10',
      endTime: '17:30',
      id: 'event5',
      title: 'New Event',
      category: '업무',
      description: '설명',
      notificationTime: 1,
      repeat: { type: 'none', interval: 0 },
      location: '신규 장소',
    };
    const result = findOverlappingEvents(newEvent, mockEvents);
    expect(result.length).toBe(0);
  });
});
