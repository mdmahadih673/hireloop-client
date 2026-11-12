import type { JobFormData } from "@/lib/types/jobs";

export type { JobFormData, StoredJob } from "@/lib/types/jobs";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface JobData {
    [key: string]: unknown;
}

export const createJob = async (jobData: JobFormData) => {
    const response = await fetch(`${baseUrl}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });
    return response.json();
}

export const deleteJob = async (jobId: string) => {
    const response = await fetch(`${baseUrl}/jobs/${jobId}`, {
        method: 'DELETE',
    });
    return response.json();
}
