import { cookies } from "next/headers";


export default async function GET(req:Request){
   const url = new URL(req.url);
   // const queryParam = new URLSearchParams(url.searchParams.toString());

   try{
    const token = (await cookies()).get("token")?.value; 
    console.log(token);

    // const apiUrl = `${process.env.}`
   }
   catch(error){console.log(
    error
   )}
}