import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TELEGRAM);
const group = process.env.CHAT_ID;
const method = ['genero','modifico','borro'];

export const sendGroup = (client, id, i) =>{
    bot.telegram.sendMessage(group, `${client} ${method[i]} un ticket ID: ${id}`)
}
export const sendDeleteClient = () =>{
    bot.telegram.sendMessage(group, `El cliente: ${client} se elimino con exito junto con sus tickets`)
}