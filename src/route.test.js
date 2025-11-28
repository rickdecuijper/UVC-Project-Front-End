import { describe, it, expect, vi, beforeEach } from 'vitest';

// PAD NAAR JOUW FILE
import * as Loader from './routes/requests/create/+page.server.js';

// We mocken ajaxhelper zodat load() geen echte API calls doet
vi.mock('$lib/helpers/ajaxhelper.js', () => ({
getData: vi.fn(),
getPromisesData: vi.fn()
}));

import { getData, getPromisesData } from '$lib/helpers/ajaxhelper.js';

describe('timeslot loader', () => {

beforeEach(() => {
	vi.clearAllMocks();
});

// 1️⃣ TEST: inAppointment
it('should match an appointment to a timeslot (inAppointment)', () => {
	const appointments = [
		{ id: 1, timeslotId: 2, name: 'Mickey' }
	];

	const result = Loader.inAppointment(2, appointments);

	expect(result).toEqual({ id: 1, timeslotId: 2, name: 'Mickey' });
});

// 2️⃣ TEST: appointment wordt gekoppeld aan juiste timeslot
it('should attach appointment to correct timeslot', async () => {
	getData
		.mockResolvedValueOnce({ data: ['/timeslot/1', '/timeslot/2'] })
		.mockResolvedValueOnce({ data: ['/appointment/1'] });

	getPromisesData
		.mockResolvedValueOnce([
			{ id: 1, starttime: '09:00', duration: 15 },
			{ id: 2, starttime: '09:15', duration: 15 }
		])
		.mockResolvedValueOnce([
			{ id: 5, timeslotId: 2, name: 'Mickey' }
		]);

	const result = await Loader.load();

	expect(result.scheduleToDay[1].appointment).toEqual({
		id: 5,
		timeslotId: 2,
		name: 'Mickey'
	});
});

// 3️⃣ TEST: appointment undefined indien geen match
it('should assign appointment: undefined when none exist', async () => {
	getData
		.mockResolvedValueOnce({ data: ['/timeslot/1'] })
		.mockResolvedValueOnce({ data: [] });

	getPromisesData
		.mockResolvedValueOnce([
			{ id: 1, starttime: '09:00', duration: 15 }
		])
		.mockResolvedValueOnce([]);

	const result = await Loader.load();

	expect(result.scheduleToDay[0].appointment).toBeUndefined();
});

});
