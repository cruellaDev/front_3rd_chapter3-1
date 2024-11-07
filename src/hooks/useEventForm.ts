import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';

import { editingEventAtom, formAtom, formRepeatAtom } from '../features/event-form/model/EventForm';
import { Event, RepeatType } from '../types';
import { getTimeErrorMessage } from '../utils/timeValidation';

type TimeErrorRecord = Record<'startTimeError' | 'endTimeError', string | null>;

export const useEventForm = () => {
  const [form, setForm] = useAtom(formAtom);
  const [formRepeat, setFormRepeat] = useAtom(formRepeatAtom);
  const [editingEvent, setEditingEvent] = useAtom(editingEventAtom);

  const { title, date, startTime, endTime, description, location, category, notificationTime } =
    form;
  const { type: repeatType, interval: repeatInterval, endDate: repeatEndDate } = formRepeat;

  const setTitle = (title: string) => setForm((prev) => ({ ...prev, title }));
  const setDate = (date: string) => setForm((prev) => ({ ...prev, date }));
  const setStartTime = (startTime: string) => setForm((prev) => ({ ...prev, startTime }));
  const setEndTime = (endTime: string) => setForm((prev) => ({ ...prev, endTime }));
  const setDescription = (description: string) => setForm((prev) => ({ ...prev, description }));
  const setLocation = (location: string) => setForm((prev) => ({ ...prev, location }));
  const setCategory = (category: string) => setForm((prev) => ({ ...prev, category }));
  const setNotificationTime = (notificationTime: number) =>
    setForm((prev) => ({ ...prev, notificationTime }));

  const [isRepeating, setIsRepeating] = useState(repeatType !== 'none');
  const setRepeatType = (type: RepeatType) => setFormRepeat((prev) => ({ ...prev, type }));
  const setRepeatInterval = (interval: number) => setFormRepeat((prev) => ({ ...prev, interval }));
  const setRepeatEndDate = (endDate: string) => setFormRepeat((prev) => ({ ...prev, endDate }));

  const [{ startTimeError, endTimeError }, setTimeError] = useState<TimeErrorRecord>({
    startTimeError: null,
    endTimeError: null,
  });

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    setTimeError(getTimeErrorMessage(newStartTime, endTime));
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    setTimeError(getTimeErrorMessage(startTime, newEndTime));
  };

  const resetForm = () => {
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setLocation('');
    setCategory('');
    setIsRepeating(false);
    setRepeatType('none');
    setRepeatInterval(1);
    setRepeatEndDate('');
    setNotificationTime(10);
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
    setLocation(event.location);
    setCategory(event.category);
    setIsRepeating(event.repeat.type !== 'none');
    setRepeatType(event.repeat.type);
    setRepeatInterval(event.repeat.interval);
    setRepeatEndDate(event.repeat.endDate || '');
    setNotificationTime(event.notificationTime);
  };

  return {
    title,
    setTitle,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
    isRepeating,
    setIsRepeating,
    repeatType,
    setRepeatType,
    repeatInterval,
    setRepeatInterval,
    repeatEndDate,
    setRepeatEndDate,
    notificationTime,
    setNotificationTime,
    startTimeError,
    endTimeError,
    editingEvent,
    setEditingEvent,
    handleStartTimeChange,
    handleEndTimeChange,
    resetForm,
    editEvent,
  };
};
