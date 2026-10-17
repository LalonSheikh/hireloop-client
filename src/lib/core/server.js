// 'use server'

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const serverFetch= async(path)=>{
// const res = await fetch(`${baseUrl}${path}`);
// // handle 401,403,404
// return res.json()
// }

// export const serverMutation = async (path,data)=>{
//    const res = await fetch(`${baseUrl}${path}`,{
//         method:'POST',
//         headers:{
//             'Content-Type':"application/json",
        
//         },
//         body:JSON.stringify(data)
//     })
    
// // handle 401,404,403

//     return res.json()
// }

'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`);
        
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const htmlText = await res.text();
            console.error(`Server Error HTML response for ${path}:`, htmlText.slice(0, 150));
            throw new Error(`Server returned an HTML error page instead of JSON for ${path}`);
        }

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || `HTTP error! status: ${res.status}`);
        }

        return data;
    } catch (error) {
        console.error(`serverFetch failed for ${path}:`, error.message);
        throw error;
    }
}

export const serverMutation = async (path, data, method="POST") => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        });

        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const htmlText = await res.text();
            console.error(`Server Error HTML response for mutation ${path}:`, htmlText.slice(0, 150));
            throw new Error(`Server returned an HTML error page instead of JSON for ${path}`);
        }

        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.error || `HTTP error! status: ${res.status}`);
        }

        return responseData;
    } catch (error) {
        console.error(`serverMutation failed for ${path}:`, error.message);
        throw error;
    }
}