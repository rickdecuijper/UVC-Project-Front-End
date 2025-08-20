import { getData } from "$lib/helpers/ajaxhelper";
import { PUBLIC_API_URL } from "$env/static/public";

/**
 * Function to load appointments
 * @returns {Promise<{ appointments: any[]; } | { error: any; }>}
 */
export const load = async () => {
    // fetch appointments urls
    const appUrls = await getData(`${PUBLIC_API_URL}/appointments/`);
    const appUrlsData = appUrls.data;
    
    // setup the promises
    const promises = appUrlsData.map((url) => getData(`${PUBLIC_API_URL}${url}`));

    // fetch all appointments
    try {
        const appointments = await Promise.all(promises);
        return { appointments };
    } catch (error) {
        console.log('🐮', error);
        return { error };
    }
};