import type { StoredJob } from "../actions/jobs";

 const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';



export const listJobs = async (): Promise<StoredJob[]> => {
    const response = await fetch(`${baseUrl}/jobs`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error("Could not load job posts");
    }
    const jobs = await response.json();
    return jobs;
}

export const getJobById = async (id: string): Promise<StoredJob> => {
    const response = await fetch(`${baseUrl}/jobs/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error(response.status === 404 ? 'Job post not found.' : 'Could not load job details.');
    }
    return response.json();
}


export const updateJob = async (id: string, jobData: Omit<StoredJob, "_id">): Promise<void> => {
    const response = await fetch(`${baseUrl}/jobs/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });
    if (!response.ok) {
        const details = await response.text().catch(() => "");
        throw new Error(details || `Could not update job post (HTTP ${response.status}).`);
    }
}
