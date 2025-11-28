import { describe, it, expect, vi } from 'vitest';
import { load } from '../src/routes/+page.server.js';

// Mock helpers
vi.mock('$lib/helpers/ajaxhelper.js', () => ({
getData: vi.fn(),
getPromisesData: vi.fn()
}));

import { getData, getPromisesData } from '$lib/helpers/ajaxhelper.js';

describe('timeslot loader', () => {

it('should match an appointment to a timeslot (inAppointment)', async () => {
	const { inAppointment } = await import('../path/to/your/file.js');

	const appointments = [
		{ id: 10, timeslotId: 2, name: 'Test' }
	];

	expect(inAppointment(2, appointments)).toEqual(appointments[0]);
	expect(inAppointment(1, appointments)).toBeUndefined();
});

it('should attach appointment to correct timeslot', async () => {
	// mock time slot URLs
	getData.mockResolvedValueOnce({ data: ['/ts/1', '/ts/2'] });
	getData.mockResolvedValueOnce({ data: ['/app/1'] });

	// Mock actual timeslot + appointment data
	getPromisesData
		.mockResolvedValueOnce([
			{ id: 1, starttime: '09:00' },
			{ id: 2, starttime: '09:15' }
		])
		.mockResolvedValueOnce([
			{ id: 5, timeslotId: 2, name: 'Mickey' }
		]);

	const result = await load();

	expect(result.scheduleToDay[1].appointment).toEqual({
		id: 5,
		timeslotId: 2,
		name: 'Mickey'
	});
});

it('should assign appointment: undefined when none exist', async () => {
	getData.mockResolvedValueOnce({ data: ['/ts/1'] });
	getData.mockResolvedValueOnce({ data: [] });

	getPromisesData
		.mockResolvedValueOnce([{ id: 1, starttime: '09:00' }]) // time slots
		.mockResolvedValueOnce([]); // no appointments

	const result = await load();

	expect(result.scheduleToDay[0].appointment).toBeUndefined();
});

});

