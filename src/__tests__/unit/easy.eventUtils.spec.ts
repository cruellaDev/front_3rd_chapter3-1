import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  const mockEvents: Event[] = [
    {
      id: 'event1',
      title: 'event 이벤트 1',
      date: '2024-06-30',
      startTime: '10:00',
      endTime: '11:00',
      description: '테스트 이벤트 설명 가',
      location: '테스트 장소 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'event2',
      title: 'evEnt 이벤트 2',
      date: '2024-07-01',
      startTime: '14:00',
      endTime: '16:00',
      description: '테스트 이벤트 설명 나',
      location: '테스트 장소 B',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'event3',
      title: 'EVNET 이벤트 3',
      date: '2024-07-09',
      startTime: '18:00',
      endTime: '19:00',
      description: '테스트 이벤트 설명 다',
      location: '테스트 장소 C',
      category: '헬스장',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'event4',
      title: 'EvEnt 이벤트 4',
      date: '2024-07-22',
      startTime: '11:00',
      endTime: '12:00',
      description: '테스트 이벤트 설명 라',
      location: '테스트 장소 D',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'event5',
      title: 'EVent 이벤트 5',
      date: '2024-07-31',
      startTime: '12:00',
      endTime: '13:00',
      description: '테스트 이벤트 설명 마',
      location: '테스트 장소 E',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'event6',
      title: 'evEnT 이벤트 6',
      date: '2024-08-02',
      startTime: '20:00',
      endTime: '21:00',
      description: '테스트 이벤트 설명 사',
      location: '테스트 장소 F',
      category: '헬스장',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
  ];

  // TODO currentDate, view 와도 영향을 받아서 쪼개야 함
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const searchTerm = '이벤트 2';
    const testDate = new Date(2024, 6);
    const testView = 'week';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(1);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const searchTerm = '';
    const testDate = new Date(2024, 6);
    const testView = 'week';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(2);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const searchTerm = '';
    const testDate = new Date(2024, 6);
    const testView = 'month';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(4);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const searchTerm = '이벤트';
    const testDate = new Date(2024, 6);
    const testView = 'week';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(2);
  });

  // TODO view 'week', 'month' 필수값이라 나눠서 확인해야 할 것 같음
  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const searchTerm = '';
    const testDate = new Date(2024, 6);
    const testView = 'week';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(2);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const searchTerm = 'event';
    const testDate = new Date(2024, 6);
    const testView = 'month';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(3);
  });

  // TODO 올바르게를 어떻게 쪼갤지 고민해 보기
  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const searchTerm = '';
    const testDate = new Date(2024, 6, 31);
    const testView = 'week';
    const result = getFilteredEvents(mockEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(2);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const emptyEvents: Event[] = [];
    const searchTerm = '';
    const testDate = new Date(2024, 6, 31);
    const testView = 'week';
    const result = getFilteredEvents(emptyEvents, searchTerm, testDate, testView);
    expect(result.length).toBe(0);
  });
});
