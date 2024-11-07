import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const mockEvents: Event[] = [
  {
    id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
    title: '팀 회의',
    date: '2024-11-20',
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

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  expect(result.current.filteredEvents.length).toBe(5);
});

// ? Q. 뭐가 맞는다는 걸까 - 제목, 설명, 위치
// ! A. 검색어가 제목, 설명, 위치에 모두 해당하지 않을 경우 빈 이벤트 배열을 반환한다. 로 바꾸면 좋겠다.
it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  act(() => {
    result.current.setSearchTerm('아무말이나써보기');
  });
  expect(result.current.filteredEvents.length).toBe(0);
});

// 제목
it('검색어가 제목과 일치하면 해당 이벤트를 반환해야 한다', () => {
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  act(() => {
    result.current.setSearchTerm('팀 회의');
  });
  expect(result.current.filteredEvents.length).toBe(1);
});

// 설명
it('검색어가 설명과 일치하면 해당 이벤트를 반환해야 한다', () => {
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  act(() => {
    result.current.setSearchTerm('분기');
  });
  expect(result.current.filteredEvents.length).toBe(1);
});

// 위치
it('검색어가 위치와 일치하면 해당 이벤트를 반환해야 한다', () => {
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  act(() => {
    result.current.setSearchTerm('집');
  });
  expect(result.current.filteredEvents.length).toBe(1);
});

// ! 제목, 설명, 위치 쪼개서 테스트 하고 아래를 테스트를 한다.
it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  act(() => {
    result.current.setSearchTerm('실');
  });
  expect(result.current.filteredEvents.length).toBe(2);
  expect(result.current.filteredEvents[0].title).toBe('팀 회의');
  expect(result.current.filteredEvents[1].title).toBe('프로젝트 마감');
});

// ! 주간, 월간 쪼개서 테스트 한다.
it.skip('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const testDate = new Date('2024-11-20');
  const testView = 'week';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  expect(result.current.filteredEvents.length).toBe(3);
});

// 주간
it('현재 뷰가 주간일 경우 주간에 해당하는 이벤트만 반환해야 한다', () => {
  const testDate = new Date('2024-11-20');
  const testView = 'week';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  expect(result.current.filteredEvents.length).toBe(3);
});

// 월간
it('현재 뷰가 월간일 경우 주간에 해당하는 이벤트만 반환해야 한다', () => {
  const testDate = new Date('2024-11-20');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  expect(result.current.filteredEvents.length).toBe(5);
});

it('검색어를 "회의"에서 "점심"으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다', () => {
  // ? testDate 를 공통 지역변수로 선언해서 사용할 경우 해당 테스트만 currentDate 는 '2024-10-27'이 된다. 왜지!
  const testDate = new Date('2024-11-01');
  const testView = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, testDate, testView));
  act(() => {
    result.current.setSearchTerm('회의');
  });
  // 모든 필터링된 이벤트의 title에 '회의'가 포함되어 있는지 확인
  result.current.filteredEvents.forEach((event) => {
    expect(event.title).toMatch(/회의/i);
  });
  act(() => {
    result.current.setSearchTerm('점심');
  });
  // 모든 필터링된 이벤트의 title에 '점심'이 포함되어 있는지 확인
  result.current.filteredEvents.forEach((event) => {
    expect(event.title).toMatch(/점심/i);
  });
});
