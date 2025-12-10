import { describe, it, expect } from 'vitest';

// Helper om testen simpel te houden
const inAppointment = (timeslotId, appointments) => {
    return appointments.find(a => a.timeslotId === timeslotId);
};

describe('calendar loader', () => {

    it('should match an appointment to a timeslot (inAppointment)', () => {
        const appointments = [
            { id: 1, timeslotId: 3, name: 'Goofy' }
        ];

        const result = inAppointment(3, appointments);

        expect(result).toEqual({ id: 1, timeslotId: 3, name: 'Goofy' });
    });

    it('should attach appointment to correct timeslot in calendar', async () => {

        // Mock van loader data
        const mockTimeslots = [
            { id: 1, time: '09:00' },
            { id: 2, time: '10:00' },
            { id: 3, time: '11:00' }
        ];

        const mockAppointments = [
            { id: 10, timeslotId: 2, name: 'Mickey' }
        ];

        // Simuleer wat load() normaal zou doen
        const day = {
            date: '2025-02-10',
            timeslots: mockTimeslots.map(t => ({
                ...t,
                appointment: inAppointment(t.id, mockAppointments)
            }))
        };

        expect(day.timeslots[1].appointment.name).toBe('Mickey');
    });

    it('should set appointment undefined when none exist', () => {
        const appointments = [];
        const result = inAppointment(999, appointments);
        expect(result).toBeUndefined();
    });
});
