import type { JobFormData } from "@/lib/types/jobs";
import type { JobApplication } from "@/lib/types/applications";
import { CreateJobApplication } from "../types/applications";

export type { JobFormData, StoredJob } from "@/lib/types/jobs";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface JobData {
    [key: string]: unknown;
}

export const createJob = async (jobData: JobFormData) => {
    const response = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });
    await (response.ok || response.text().catch(() => "").then((details) => {
        throw new Error(details || `Could not publish job (HTTP ${response.status}).`);
    }));

    const result: { acknowledged?: boolean } = await response.json();
    if (result.acknowledged === false) {
        throw new Error("The job was not saved. Please try again.");
    }
    return result;
}

export const deleteJob = async (jobId: string) => {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: 'DELETE',
    });
    return response.json();
}

export async function applyToAJob({data}:{data:CreateJobApplication}) {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    return res.json()
}

export const getApplicationsByUser = async (query= ''): Promise<JobApplication[]> => {
    const response = await fetch(`${BASE_URL}/applications?userId=${encodeURIComponent(query)}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error("Could not load your applications.");
    }
    return response.json();
}

export const getApplicationsCount = async (query= ''): Promise<{count : number}> => {
    const search = query ? `?${query}` : '';
    const response = await fetch(`${BASE_URL}/applications/count${search}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error("Could not load your applications.");
    }
    return response.json();
}
