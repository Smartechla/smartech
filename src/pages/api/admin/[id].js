import { eq } from "drizzle-orm";
import { db } from "../../..";
import { Clients } from "../../../db/schema";
import responseHandle from "../../../utils/reponseHandle";
import { sendDeleteClient } from "../../../utils/botTelegram";
import { adminPass } from "../../../utils/verify";

export const DELETE = async ({request,params})=>{
    try{
        const {id} = params;
        if(isNaN(Number(id))){
            throw new Error("El params no es un ID")
        }
        if(await adminPass(request)){
            const client = await db.query.Clients.findFirst({where: (c,{eq})=>eq(c.id, id)})
            const res = await db.delete(Clients).where(
               eq(Clients.id, id)
            ).returning({id: Clients.id});
            
            if(res.length != 0){
                sendDeleteClient(client.name)
                return responseHandle({message: "borrado con exito"} , 200)
            }else{
                return responseHandle({message: "No se pudo eliminar el reporte"}, 400)
            }
        }else{
            throw new Error("Sin permisos para realizar la accion")
        }
    }catch(error){
        return responseHandle({message: error.message}, 403)
    }
}
