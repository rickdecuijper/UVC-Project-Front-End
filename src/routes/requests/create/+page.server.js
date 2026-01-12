/**
 * We should also use the server to populate the time slots
 * and to find the clients
 */import { fail } from '@sveltejs/kit';

function makeTimeSlots(start = '09:00', end = '17:00', stepMin = 30) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);

  const d = new Date();
  d.setHours(sh, sm, 0, 0);
  const endD = new Date();
  endD.setHours(eh, em, 0, 0);

  const out = [];
  const pad = (n) => n.toString().padStart(2, '0');

  while (d <= endD) {
    out.push(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    d.setMinutes(d.getMinutes() + stepMin);
  }
  return out;
}

export const actions = {
  book: async ({ request }) => {
    const fd = await request.formData();
    const pet_name = String(fd.get('pet_name') ?? '').trim();
    const date = String(fd.get('date') ?? '');
    const time = String(fd.get('time') ?? '');

    const errors = {};
    const values = { pet_name, date, time };

    if (!pet_name) errors.pet_name = 'Please enter your pet’s name.';

    if (!date) {
      errors.date = 'Pick a date.';
    } else {
      const picked = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(picked.getTime())) {
        errors.date = 'Invalid date.';
      } else if (picked < today) {
        errors.date = 'Date can’t be in the past.';
      }
    }

    const validSlots = makeTimeSlots();
    if (!time) {
      errors.time = 'Pick a time.';
    } else if (!validSlots.includes(time)) {
      errors.time = 'Pick a valid time slot.';
    }

    if (Object.keys(errors).length) {
      return fail(400, {
        message: 'Please fix the errors below.',
        errors,
        values
      });
    }

    // TODO: Persist the booking (DB, email, etc.)
    return {
      ok: true,
      message: `Thanks! Your booking for ${pet_name} on ${date} at ${time} is received.`,
      values
    };
  }
};
