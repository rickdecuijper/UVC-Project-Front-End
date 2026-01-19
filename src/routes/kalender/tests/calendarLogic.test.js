import { describe, it, expect } from 'vitest';

// Core logic functions from your code
const inAppointment = (timeslotId, appointments) => {
  return appointments.find(a => a.timeslotId === timeslotId);
};

const formatDate = (d) => {
  if (!d) { return ''};
  const dateObj = d instanceof Date ? d : new Date(d);
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
};

const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // Monday as first day
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
};

describe('Basic calendar logic', () => {
  it('inAppointment returns the correct appointment', () => {
    const appointments = [{ id: 1, timeslotId: 2, name: 'Mickey' }];
    expect(inAppointment(2, appointments)).toEqual({ id: 1, timeslotId: 2, name: 'Mickey' });
    expect(inAppointment(3, appointments)).toBeUndefined();
  });

  it('formatDate formats a date correctly', () => {
    expect(formatDate(new Date('2026-01-19'))).toBe('2026-01-19');
    expect(formatDate(null)).toBe('');
  });

  it('getStartOfWeek returns the Monday of the week', () => {
    const date = new Date('2026-01-21'); // Wednesday
    const monday = getStartOfWeek(date);
    expect(monday.getDay()).toBe(1); // Monday = 1
    expect(formatDate(monday)).toBe('2026-01-19');
  });
});
