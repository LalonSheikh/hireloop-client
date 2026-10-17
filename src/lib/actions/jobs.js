// // 'use server'

// // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// // export const createJob = async (newJobData)=>{
// //     const res = await fetch(`${baseUrl}/api/jobs`,{
// //         method:'POST',
// //         headers:{
// //             'Content-Type':'application/json'
// //         },
// //         body:JSON.stringify(newJobData),
// //     }) 
// //     return res.json()
// // }
// "use server";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createJob = async (newJobData) => {
//   try {
//     console.log("BASE URL:", baseUrl);
//     console.log("NEW JOB DATA:", newJobData);

//     const res = await fetch(`${baseUrl}/api/jobs`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newJobData),
//     });

//     const text = await res.text();

//     console.log("STATUS:", res.status);
//     console.log("CONTENT TYPE:", res.headers.get("content-type"));
//     console.log("SERVER RESPONSE:", text);

//     if (!res.ok) {
//       throw new Error(`Create job failed: ${res.status} ${text}`);
//     }

//     return JSON.parse(text);
//   } catch (error) {
//     console.error("createJob error:", error);
//     throw error;
//   }
// };

'use server'

import { serverMutation } from "../core/server"

export const createJob = async (newJobData)=>{
  return serverMutation('/api/jobs', newJobData)
}