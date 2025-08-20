/**
     * This function fetches the data from the API
     * @param url
     */
export const getData = async (url) => {
    try {
        const response = await fetch(url);
        const items = await response.json();
        return items;
    } catch (error) {
        return error;
    }
};

/**
 * This function handles multiple request
 * @param urls
 */
export const getPromisesData = async (urls) => {
    try {
        const response = await Promise.all(urls);
        return response;
    } catch (error) {
        return error;
    }
};