import path from "node:path"
import fs from "node:fs/promises"
import responseHandle from "../../utils/reponseHandle";

export async function GET ({params}){
    try{
        const {id} = params;

        const filePath = path.join(process.cwd(), "src", "uploads", `image${id}.png`);
        const img = await fs.readFile(filePath)
        
        return new Response(img, {headers: {"Content-type": "image/png"}},{status: 200});
    }
    catch(error){
        console.log(error)
    }
}

export const POST = async ({params, request}) =>{
    try{
        const { id } = params
        const form = await request.formData();
        const text = JSON.parse(form.get("text"));
        const file = form.get("file");

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const extension = file.name.slice(file.name.lastIndexOf("."))
        const fileName = `image${id}${extension}`

        await fs.mkdir(path.join(process.cwd(), "src", "uploads"),{recursive: true})
        const filePath = path.join(process.cwd(), "src", "uploads",fileName)

        await fs.writeFile(filePath, buffer);
        const data = {message: `hola ${text}`}
        
        return responseHandle(data, 201)
    }catch(error){
        console.log("este es el "+error)
    }

}

