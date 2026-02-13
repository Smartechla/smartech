import { db } from "..";

export const getHostClient = async (request) =>{

    const host = await request.headers.get('host');
    const clientName = host.slice(0, host.indexOf("."));
    const clientFound = await db.query.Clients.findFirst({where: (c,{eq})=>eq(c.name, clientName)});
     
    if(clientFound){
        return clientFound;
    }
    
}