import { Clients } from "../../db/schema";
import { db } from "../../index";
import responseHandle from "../../utils/reponseHandle";
import { adminPass } from "../../utils/verify";

export const POST = async ({request})=>{
    try{
        if(await adminPass(request)){

            const { name } = await request.json();
            
            const newClient = await db.insert(Clients).values({name}).returning();
            
            return responseHandle(newClient, 201)
        }else{
            throw new Error("Sin permisos para realizar la accion")
        }
    }catch(error){
        return responseHandle({message: error.message}, 403)
    }

}
export const GET = async ({request})=>{
    try{
        if(await adminPass(request)){
            const clients = await db.query.Clients.findMany();
            
            return responseHandle(clients, 200);
        }else{
            throw new Error("Sin permisos para realizar la accion")
        }
    }catch(error){
        return responseHandle({message: error.message}, 403)
    }

}