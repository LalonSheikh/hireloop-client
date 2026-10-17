import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async ()=>{
    return serverFetch('/api/jobs')
}


export const getJobById = async (jobId)=>{
return serverFetch(`/api/jobs/${jobId}`)
}

// export const getCompanyJobs = async (companyId,status="active")=>{
//     const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
//     return res.json();

// }
// export const getCompanyJobs = async (companyId,status="active")=>{
//     const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
//     return res.json(); // <-- CRASHES HERE if res returns an HTML error page
// }
export const getCompanyJobs = async (companyId, status = "active") => {
    try {
        const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
        
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error("Server returned non-JSON response for jobs fetch.");
            return []; // Safe fallback array
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch company jobs:", error.message);
        return []; // Safe fallback array
    }
}