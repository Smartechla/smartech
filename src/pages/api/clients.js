import { Clients } from "../../db/schema";
import { db } from "../../index";
import responseHandle from "../../utils/reponseHandle";


export const POST = async ({request})=>{
    const { client } = await request.json();

    const newClient = await db.insert(Clients).values({client}).returning();

    return responseHandle(newClient, 201)

}