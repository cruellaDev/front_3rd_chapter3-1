import { act, renderHook } from '@testing-library/react';

import { useCalendarView } from '../../hooks/useCalendarView.ts';
import { assertDate } from '../utils.ts';

describe('초기 상태', () => {
  it('view는 "month"이어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.view).toBe('month');
  });

  it('currentDate는 오늘 날짜인 "2024-10-01"이어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    const expectingDate = new Date('2024-10-01');
    assertDate(expectingDate, result.current.currentDate);
  });

  it('holidays는 10월 휴일인 개천절, 한글날이 지정되어 있어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.holidays).toEqual({ '2024-10-03': '개천절', '2024-10-09': '한글날' });
  });
});

// ? Q. 적절하게를 구체적으로 설명할 수는 없을까?
// ! A: view 를 'week' 변경 시 view state는 'week'로 업데이트되어야 한다. 이런 식이면 좋겠다.
it("view를 'week'으로 변경 시 적절하게 반영된다", () => {
  const { result } = renderHook(() => useCalendarView());
  const WEEK = 'week';
  act(() => {
    result.current.setView(WEEK);
  });
  expect(result.current.view).toBe(WEEK);
});

it("주간 뷰에서 다음으로 navigate시 7일 후 '2024-10-08' 날짜로 지정이 된다", () => {
  const { result } = renderHook(() => useCalendarView());
  // 주간 뷰 설정
  const WEEK = 'week';
  act(() => {
    result.current.setView(WEEK);
  });
  // 다음으로 navigate
  const DIRECTION = 'next';
  act(() => {
    result.current.navigate(DIRECTION);
  });
  const expectingDate = new Date('2024-10-08');
  assertDate(expectingDate, result.current.currentDate);
});

it("주간 뷰에서 이전으로 navigate시 7일 후 '2024-09-24' 날짜로 지정이 된다", () => {
  const { result } = renderHook(() => useCalendarView());
  // 주간 뷰 설정
  const WEEK = 'week';
  act(() => {
    result.current.setView(WEEK);
  });
  // 이전으로 navigate
  const DIRECTION = 'prev';
  act(() => {
    result.current.navigate(DIRECTION);
  });
  const expectingDate = new Date('2024-09-24');
  assertDate(expectingDate, result.current.currentDate);
});

it("월간 뷰에서 다음으로 navigate시 한 달 후 '2024-11-01' 날짜여야 한다", () => {
  const { result } = renderHook(() => useCalendarView());
  // (기본설정은 월간뷰)
  // 다음으로 navigate
  const DIRECTION = 'next';
  act(() => {
    result.current.navigate(DIRECTION);
  });
  const expectingDate = new Date('2024-11-01');
  assertDate(expectingDate, result.current.currentDate);
});

it("월간 뷰에서 이전으로 navigate시 한 달 전 '2024-09-01' 날짜여야 한다", () => {
  const { result } = renderHook(() => useCalendarView());
  // (기본설정은 월간뷰)
  // 이전으로 navigate
  const DIRECTION = 'prev';
  act(() => {
    result.current.navigate(DIRECTION);
  });
  const expectingDate = new Date('2024-09-01');
  assertDate(expectingDate, result.current.currentDate);
});

it("currentDate가 '2024-01-01' 변경되면 1월 휴일 '신정'으로 업데이트되어야 한다", async () => {
  const { result } = renderHook(() => useCalendarView());
  const testDate = new Date('2024-01-01');
  act(() => {
    result.current.setCurrentDate(testDate);
  });
  expect(result.current.holidays).toEqual({ '2024-01-01': '신정' });
});
