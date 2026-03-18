import responseHandle from "../../../utils/reponseHandle";
import { db } from "../../..";
import { getHostClient } from "../../../utils/getHostClient";
import { ReportsClient } from "../../../db/schema";
import { and, eq } from "drizzle-orm";
import { sendGroup } from "../../../utils/botTelegram";

const localHost = process.env.HOST

const verify = async (request, params) => {
    const client = await getHostClient(request);
    const {id} = params;
    const conditions = [eq(ReportsClient.id, id)]
    if(isNaN(Number(id))){
        throw new Error("El params no es un ID")
    }
    if(!client){
        throw new Error("host desconocido")
    }
    if(client != localHost){
        conditions.push(eq(ReportsClient.clientId, client.id));
    }
    return {client, id, conditions};
}

export const DELETE = async ({request, params}) => {
    try{
        const {client, id, conditions} = await verify(request, params);
        const res = await db.delete(ReportsClient).where(
            and(...conditions)
        ).returning({id: ReportsClient.id});
        
        if(res.length != 0){
            sendGroup(client.name?client.name:"Desde la oficina se", id, 2)
            return responseHandle({message: "borrado con exito"} , 200)
        }else{
            return responseHandle({message: "No se pudo eliminar el reporte"}, 400)
        }

    }catch(error){
        return responseHandle({message: error.message}, 403)
    }
};

export const PUT = async ({request, params}) => {
    try{
        const {client, id, conditions} = await verify(request, params);
        
        const {user, pc, OS, motherboard, storage, ram, cpu, gpu, bios, description, status} = await request.json();
        const res = await db.update(ReportsClient)
            .set({
                user,
                pc,
                OS,
                motherboard,
                storage,
                ram,
                cpu,
                gpu,
                bios,
                description,
                status: status?"Atendido":"Pendiente",
            })
            .where(
                and(...conditions)
            ).returning();
        if(res.length !=0){
            sendGroup(client.name?client.name:"Desde la oficina se", id, 1)
            return responseHandle(res, 200)
        }

    }catch(error){
        return responseHandle({message: error.message}, 403)
    }

};
export const GET = async ({request, params}) => {
    try{
        const {client, id, conditions} = await verify(request,params);
        const report = await db.query.ReportsClient.findFirst({where: (r,{eq, and})=>and(...conditions)});

        return responseHandle(report, 200);
    }catch(error){
        return responseHandle({message: error.message}, 403)
    }
};