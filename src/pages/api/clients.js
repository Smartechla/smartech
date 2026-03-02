import { Clients } from "../../db/schema";
import { db } from "../../index";
import responseHandle from "../../utils/reponseHandle";


export const POST = async ({request})=>{
    const { name } = await request.json();

    const newClient = await db.insert(Clients).values({name}).returning();

    return responseHandle(newClient, 201)

}
export const GET = async ({request})=>{
    try{

        const host = await request.headers.get("host");
        const localHost = process.env.HOST
        if(host==localHost){
            const clients = await db.query.Clients.findMany();
            
            return responseHandle(clients, 200);
        }else{
            throw new Error("Sin permisos para realizar la accion")
        }
    }catch(error){
        return responseHandle({message: error.message}, 403)
    }

}