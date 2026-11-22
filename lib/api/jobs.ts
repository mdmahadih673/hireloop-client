import type { StoredJob } from "../actions/jobs";

 const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
 const baseUrl = typeof window === 'undefined' ? BACKEND_URL : '/api/backend';

const ensureOk = (response: Response, message: string) =>
    response.ok ? response : (() => { throw new Error(message) })();



export const listJobs = async (query = ''): Promise<StoredJob[]> => {
    const queryString = query ? `?${query}` : '';
    const response = await fetch(`${baseUrl}/jobs${queryString}`, { cache: 'no-store' });
    ensureOk(response, "Could not load job posts");
    const jobs = await response.json();
    return jobs;
}

export const getJobById = async (id: string): Promise<StoredJob> => {
    const response = await fetch(`${baseUrl}/jobs/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    });
    ensureOk(response, response.status === 404 ? 'Job post not found.' : 'Could not load job details.');
    return response.json();
}


export const updateJob = async (id: string, jobData: Omit<StoredJob, "_id">): Promise<void> => {
    const response = await fetch(`${baseUrl}/jobs/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(jobData),
    });
    response.ok || await response.text()
        .catch(() => "")
        .then((details) => { throw new Error(details || `Could not update job post (HTTP ${response.status}).`); });
}
