import { EventForm, Event } from '../../../types';

interface EventsResponse {
  events: Event[];
}

export async function fetchEventsApi(): Promise<EventsResponse> {
  const response = await fetch('/api/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await response.json();
  return data;
}

export async function addEventApi(eventData: EventForm) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to add event');
  }
}

export async function updateEventApi(eventData: Event) {
  const response = await fetch(`/api/events/${(eventData as Event).id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to edit event');
  }
}

export async function deleteEventApi(id: string) {
  const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
}
