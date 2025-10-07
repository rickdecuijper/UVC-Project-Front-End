// please pay attention this setup creates a shared state on the server when using SSR
// So do not use this in production :-)
// read this: https://www.loopwerk.io/articles/2025/svelte-5-stores/
export const selectedClient = $state({ client: undefined });
export function setClient(newClient) { selectedClient.client = newClient; }
// export function getClient() { return selectedClient; }