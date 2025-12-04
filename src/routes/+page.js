// import { error } from '@sveltejs/kit';
import { getData, getPromisesData } from '$lib/helpers/ajaxhelper';

// used api routes
const timeSlotsApiRoute = `${PUBLIC_API_URL}/timeslots`;
const allAppointmentsOnOneDay = `${PUBLIC_API_URL}/appointments?day=248`;

/**
     * Because the API does not support schedules we have to combine multiple request to create our own.
     * We want to create readable code and we would like to create maintainable code, therefore we have to
     * work with one array that contains the schedule. The array should look like this:
     * [
     *	{ id:1, starttime: '09.00', createdAt:'date', duration: 15, appointment: undefined },
     *	{ id:2, start: '09.15', createdAt:'date', duration: 15, appointment: { name: 'Mickey', breed: 'Mouse' } }
     * ]
     * Now we have to fill/create this schedule via multiple requests.
     */
let scheduleToDay = [];

/**
     * This function checks if the appointment is on an a specific time slot
     * @param timeSlotId
     * @param data
     */
const inAppointment = (timeSlotId, data) => {
    const appointment = data.find((appointment) => appointment.timeslotId === timeSlotId);
    return appointment;
};

/**
 * Function to load appointments
 * @returns {Promise<{ appointments: any[]; } | { error: any; }>}
 */
export const load = async () => {
    // you will get a warning to use the fetch method Sveltekit provided. For now that is okay.
    // I am not using the prescribed fetch method for simplicity.

    // Fetch all the time slots and appointments
    const allTheTimeSlots = await getData(timeSlotsApiRoute);
    const allTheAppointmentsOnOneDay = await getData(allAppointmentsOnOneDay);

    // extract all the urls from the response
    const allTheUrlsOfTheTimeSlots = allTheTimeSlots.data;
    const allTheUrlsOfTheAppointmentsOnOneDay = allTheAppointmentsOnOneDay.data;

    // we have to execute multiple requests and wait for all te response to come back, so promisify the requests
    const timeSlotPromises = allTheUrlsOfTheTimeSlots.map((url) =>
        getData(`http://localhost:3012/api/v1${url}`)
    );
    const appointmentPromises = allTheUrlsOfTheAppointmentsOnOneDay.map((url) =>
        getData(`http://localhost:3012/api/v1${url}`)
    );

    // get the response data from the promises
    const timeSlotData = await getPromisesData(timeSlotPromises);
    const appointmentData = await getPromisesData(appointmentPromises);

    // fill the schedule with appointments
    // map function returns a new array with the same length as the original array
    scheduleToDay = timeSlotData.map((timeslot) => {
        if (inAppointment(timeslot.id, appointmentData)) {
            return {
                ...timeslot,
                appointment: inAppointment(timeslot.id, appointmentData)
            };
        } else {
            return {
                ...timeslot,
                appointment: undefined
            };
        }
    });
    return { scheduleToDay };
};
