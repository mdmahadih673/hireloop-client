import { StoredJob } from "../actions/jobs";

 const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';



export const listJobs = async (): Promise<StoredJob[]> => {
    const response = await fetch(`${baseUrl}/jobs`);
    if (!response.ok) {
        throw new Error("Could not load job posts");
    }
    const jobs = await response.json();
    console.log(jobs);
    return jobs;
}