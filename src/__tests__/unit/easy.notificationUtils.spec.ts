import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
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

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const testDate = new Date('2024-11-22 17:59:00');
    const notifiedEvents = [
      '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      '09702fb3-a478-40b3-905e-9ab3c8849dcd',
    ];
    const result = getUpcomingEvents(mockEvents, testDate, notifiedEvents);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('80d85368-b4a4-47b3-b959-25171d49371f');
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const testDate = new Date('2024-11-21 12:29:00');
    const notifiedEvents = [
      '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      '09702fb3-a478-40b3-905e-9ab3c8849dcd',
    ];
    const result = getUpcomingEvents(mockEvents, testDate, notifiedEvents);
    expect(result.length).toBe(0);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const testDate = new Date('2024-11-25 08:58:00');
    const notifiedEvents = [
      '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      '80d85368-b4a4-47b3-b959-25171d49371f',
    ];
    const result = getUpcomingEvents(mockEvents, testDate, notifiedEvents);
    expect(result.length).toBe(0);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const testDate = new Date('2024-11-25 09:01:00');
    const notifiedEvents = [
      '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      '80d85368-b4a4-47b3-b959-25171d49371f',
    ];
    const result = getUpcomingEvents(mockEvents, testDate, notifiedEvents);
    expect(result.length).toBe(0);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const testEvent: Event = {
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
    };
    const result = createNotificationMessage(testEvent);
    expect(result).toBe('1분 후 운동 일정이 시작됩니다.');
  });
});
