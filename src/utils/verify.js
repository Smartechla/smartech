import { getHostClient } from "./getHostClient";

const localHost = process.env.HOST;

export const adminPass = async (request) =>{
    const host = await request.headers.get("host")
    return host==localHost;
}