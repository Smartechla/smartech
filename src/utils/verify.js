import { getHostClient } from "./getHostClient";

const localHost = process.env.HOST;

export const adminPass = async (request) =>{
    const host = await getHostClient(request);
    return host==localHost;
}