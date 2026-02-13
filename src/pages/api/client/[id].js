import responseHandle from "../../../utils/reponseHandle";
import { db } from "../../..";
import { getHostClient } from "../../../utils/getHostClient";
import { ReportsClient } from "../../../db/schema";
import { and, eq } from "drizzle-orm";
import { sendGroup } from "../../../utils/botTelegram";

export const DELETE = async ({request, params}) => {
    const client = await getHostClient(request);
    const { id } = params;

    if(isNaN(Number(id))){
        return responseHandle({message: "El params no es un ID"}, 403);
    }
    if(!client){
        return responseHandle({message: "host desconocido"}, 403)
    }
    if(client){
        const res = await db.delete(ReportsClient).where(
            and(
                eq(ReportsClient.id, id),
                eq(ReportsClient.clientId, client.id)
            )
        ).returning({id: ReportsClient.id});
 
        if(res.length != 0){
            sendGroup(client.name, id, 2)
            return responseHandle({message: "borrado con exito"} , 200)
        }else{
            return responseHandle({message: "No se pudo eliminar el reporte"}, 400)
        }
        
    }

};