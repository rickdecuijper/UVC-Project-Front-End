import { getData } from "../../lib/helpers/ajaxhelper";
import.meta.env.VITE_PUBLIC_API_URL

/**
 * Function to load appointments
 */
export const load = async () => {
    const appUrls = await getData(`${PUBLIC_API_URL}/appointments/`);
    const appUrlsData = appUrls.data;

    const promises = appUrlsData.map((url) => getData(`${PUBLIC_API_URL}${url}`));

    try {
        const appointments = await Promise.all(promises);

        // Example of using inAppointment internally
        // const example = inAppointment(someId, appointments);

        return { appointments };
    } catch (error) {
        console.log('🐮', error);
        return { error };
    }
};

// Local helper (not exported)
function inAppointment(timeslotId, appointments) {
    return appointments.find(a => a.timeslotId === timeslotId);
}
