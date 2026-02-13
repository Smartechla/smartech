export const responseHandle = (data, status) =>{
   return new Response(JSON.stringify(data),{status})
}

export default responseHandle;