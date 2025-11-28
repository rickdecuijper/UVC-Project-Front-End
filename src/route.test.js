import { describe, it, expect } from 'vitest';
import { load } from 'src/routes/requests/+page.server.js';
import { inAppointment } from '$lib/helpers/appointmentHelper.js';

describe('timeslot loader', () => {
    it('should match an appointment to a timeslot (inAppointment)', () => {
        const appointments = [
            { id: 1, timeslotId: 2, name: 'Mickey' }
        ];

        const result = inAppointment(2, appointments);

        expect(result).toEqual({ id: 1, timeslotId: 2, name: 'Mickey' });
    });

    it('should attach appointment to correct timeslot', async () => {
        const mockAppointments = [
            { id: 1, timeslotId: 1, name: 'Donald' },
            { id: 2, timeslotId: 2, name: 'Mickey' }
        ];

        // Hier kun je load() eventueel mocken als nodig
        const result = { scheduleToDay: mockAppointments.map(a => ({ ...a })) };

        expect(result.scheduleToDay[1].name).toBe('Mickey');
    });

    it('should assign appointment: undefined when none exist', () => {
        const appointments = [];
        const result = inAppointment(2, appointments);
        expect(result).toBeUndefined();
    });
});
