import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

describe('getDaysInMonth', () => {
  it('1월은 31일 수를 반환한다', () => {
    const result = getDaysInMonth(2024, 1);
    expect(result).toBe(31);
  });

  it('4월은 30일 일수를 반환한다', () => {
    const result = getDaysInMonth(2024, 4);
    expect(result).toBe(30);
  });

  it('윤년의 2월에 대해 29일을 반환한다', () => {
    const result = getDaysInMonth(2024, 2);
    expect(result).toBe(29);
  });

  it('평년의 2월에 대해 28일을 반환한다', () => {
    const result = getDaysInMonth(2023, 2);
    expect(result).toBe(28);
  });

  // TODO 적절히 처리한다는 게 뭘까
  it('유효하지 않은 월에 대해 적절히 처리한다', () => {
    const result = getDaysInMonth(2024, 23);
    const testDate = new Date(2024, 23, 0);
    expect(testDate).toEqual(new Date('2025-11-30'));
    expect(result).toBe(30);
  });
});

describe('getWeekDates', () => {
  // TODO 올바른 주의 날짜는 뭘까
  // TODO 7개 나오는지도 쪼개기
  // TODO 처음 날짜가 일요일인지도 확인
  // TODO 마지막 날짜가 토요일인지도 확인
  // TODO 정 가운데 날짜가 수요일인지도 확인
  it('주중의 날짜(수요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const testDate = new Date('2024-11-13');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[3]).toEqual(new Date('2024-11-13'));
  });

  it('주의 시작(월요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const testDate = new Date('2024-11-04');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[1]).toEqual(new Date('2024-11-04'));
  });

  it('주의 끝(일요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const testDate = new Date('2024-11-03');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[0]).toEqual(new Date('2024-11-03'));
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연말)', () => {
    const testDate = new Date('2023-12-31');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[0]).toEqual(new Date('2023-12-31'));
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연초)', () => {
    const testDate = new Date('2024-01-01');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[1]).toEqual(new Date('2024-01-01'));
  });

  it('윤년의 2월 29일을 포함한 주를 올바르게 처리한다', () => {
    const testDate = new Date('2024-02-28');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[4]).toEqual(new Date('2024-02-29'));
  });

  // TODO 올바르게 처리는 뭘까?
  // TODO 쪼개기
  // TODO 평년 2월 28일
  // TODO 1월 31일
  // TODO 4월 30일
  it('월의 마지막 날짜를 포함한 주를 올바르게 처리한다', () => {
    const testDate = new Date('2024-04-30');
    const result = getWeekDates(testDate);
    expect(result.length).toBe(7);
    expect(result[3]).toEqual(new Date('2024-05-01'));
  });

  // TODO 올바르지 않은 날짜는 처리되나?
});

describe('getWeeksAtMonth', () => {
  // TODO 쪼개기
  it('2024년 7월 1일의 올바른 주 정보를 반환해야 한다', () => {
    const testDate = new Date('2024-07-01');
    const result = getWeeksAtMonth(testDate);
    expect(result.length).toBe(5);
    expect(result[0][1]).toBe(1);
    expect(result[4][3]).toBe(31);
  });
  // TODO 윤년
  // TODO 올바르지 않은 날짜는 처리되나?
});

describe('getEventsForDay', () => {
  const mockEvents: Event[] = [
    {
      id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      title: '팀 회의',
      date: '2024-11-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '주간 팀 미팅',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: '09702fb3-a478-40b3-905e-9ab3c8849dcd',
      title: '점심 약속',
      date: '2024-11-21',
      startTime: '12:30',
      endTime: '13:30',
      description: '동료와 점심 식사',
      location: '회사 근처 식당',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'da3ca408-836a-4d98-b67a-ca389d07552b',
      title: '프로젝트 마감',
      date: '2024-11-25',
      startTime: '09:00',
      endTime: '18:00',
      description: '분기별 프로젝트 마감',
      location: '사무실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'dac62941-69e5-4ec0-98cc-24c2a79a7f81',
      title: '생일 파티',
      date: '2024-11-28',
      startTime: '19:00',
      endTime: '22:00',
      description: '친구 생일 축하',
      location: '친구 집',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: '80d85368-b4a4-47b3-b959-25171d49371f',
      title: '운동',
      date: '2024-11-22',
      startTime: '18:00',
      endTime: '19:00',
      description: '주간 운동',
      location: '헬스장',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
  ];

  it('특정 날짜(1일)에 해당하는 이벤트만 정확히 반환한다', () => {
    const testDate = new Date('2024-11-01').getDate();
    const result = getEventsForDay(mockEvents, testDate);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('팀 회의');
  });

  it('해당 날짜에 이벤트가 없을 경우 빈 배열을 반환한다', () => {
    const testDate = new Date('2024-11-20').getDate();
    const result = getEventsForDay(mockEvents, testDate);
    expect(result.length).toBe(0);
  });

  it('날짜가 0일 경우 빈 배열을 반환한다', () => {
    const testDate = 0;
    const result = getEventsForDay(mockEvents, testDate);
    expect(result.length).toBe(0);
  });

  it('날짜가 32일 이상인 경우 빈 배열을 반환한다', () => {
    const testDate = 32;
    const result = getEventsForDay(mockEvents, testDate);
    expect(result.length).toBe(0);
  });
});

describe('formatWeek', () => {
  it('월의 중간 날짜에 대해 올바른 주 정보를 반환한다', () => {
    const testDate = new Date('2024-10-15');
    const result = formatWeek(testDate);
    expect(result).toBe('2024년 10월 3주');
  });

  it('월의 첫 주에 대해 올바른 주 정보를 반환한다', () => {
    const testDate = new Date('2024-10-01');
    const result = formatWeek(testDate);
    expect(result).toBe('2024년 10월 1주');
  });

  it('월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const testDate = new Date('2024-10-31');
    const result = formatWeek(testDate);
    expect(result).toBe('2024년 10월 5주');
  });

  it('연도가 바뀌는 주에 대해 올바른 주 정보를 반환한다', () => {
    const testDate = new Date('2023-12-31');
    const result = formatWeek(testDate);
    expect(result).toBe('2024년 1월 1주');
  });

  it('윤년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const testDate = new Date('2024-02-29');
    const result = formatWeek(testDate);
    expect(result).toBe('2024년 2월 5주');
  });

  it('평년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const testDate = new Date('2023-02-28');
    const result = formatWeek(testDate);
    expect(result).toBe('2023년 3월 1주');
  });
});

describe('formatMonth', () => {
  it("2024년 7월 10일을 '2024년 7월'로 반환한다", () => {});
});

describe('isDateInRange', () => {
  const rangeStart = new Date('2024-07-01');
  const rangeEnd = new Date('2024-07-31');

  it('범위 내의 날짜 2024-07-10에 대해 true를 반환한다', () => {});

  it('범위의 시작일 2024-07-01에 대해 true를 반환한다', () => {});

  it('범위의 종료일 2024-07-31에 대해 true를 반환한다', () => {});

  it('범위 이전의 날짜 2024-06-30에 대해 false를 반환한다', () => {});

  it('범위 이후의 날짜 2024-08-01에 대해 false를 반환한다', () => {});

  it('시작일이 종료일보다 늦은 경우 모든 날짜에 대해 false를 반환한다', () => {});
});

describe('fillZero', () => {
  test("5를 2자리로 변환하면 '05'를 반환한다", () => {});

  test("10을 2자리로 변환하면 '10'을 반환한다", () => {});

  test("3을 3자리로 변환하면 '003'을 반환한다", () => {});

  test("100을 2자리로 변환하면 '100'을 반환한다", () => {});

  test("0을 2자리로 변환하면 '00'을 반환한다", () => {});

  test("1을 5자리로 변환하면 '00001'을 반환한다", () => {});

  test("소수점이 있는 3.14를 5자리로 변환하면 '03.14'를 반환한다", () => {});

  test('size 파라미터를 생략하면 기본값 2를 사용한다', () => {});

  test('value가 지정된 size보다 큰 자릿수를 가지면 원래 값을 그대로 반환한다', () => {});
});

describe('formatDate', () => {
  it('날짜를 YYYY-MM-DD 형식으로 포맷팅한다', () => {});

  it('day 파라미터가 제공되면 해당 일자로 포맷팅한다', () => {});

  it('월이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {});

  it('일이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {});
});
