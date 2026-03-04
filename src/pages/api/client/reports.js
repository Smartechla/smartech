import responseHandle from "../../../utils/reponseHandle";
import { db } from "../../../index";
import { ReportsClient } from "../../../db/schema";
import { getHostClient } from '../../../utils/getHostClient';
import { sendGroup } from '../../../utils/botTelegram';
import { adminPass } from "../../../utils/verify";

export const GET = async ({ request }) =>{
    try{
        const client = await getHostClient(request);
        let allReport;
        if(await adminPass(request)){
            allReport = await db.query.ReportsClient.findMany()
        }else{
            allReport = await db.query.ReportsClient.findMany({where: (rp,{eq})=>eq(rp.clientId, client.id)})
        }
        return responseHandle(allReport, 200)
    }
    catch(error){
        console.log(error)
    }
}

export const POST = async ({request}) => {
    try{
        const client = await getHostClient(request)

        if(client){
            const {user, pc, OS, motherboard, storage, ram, cpu, gpu, bios, description, status} = await request.json;

            const data = {
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
                clientId: client.id,
            }
            const newReporte = await db.insert(ReportsClient).values(data).returning();

            sendGroup(client.name, newReporte[0].id, 0)

            return responseHandle({message: "creado con exito"}, 201)
        }

        return responseHandle({message: "Este cliente no esta registrado"}, 400)
    }
    catch(error){
        console.log(error)
    }
}
