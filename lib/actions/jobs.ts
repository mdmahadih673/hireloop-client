import type { JobFormData } from "@/app/Dashboard/Recruiter/jobs/new/page";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface JobData {
    [key: string]: unknown;
}

export type StoredJob = JobFormData & {
    _id: string;
    createdAt?: string;
};

export const createJob = async (jobData: JobFormData): Promise<unknown> => {
    const response = await fetch(`${baseUrl}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });
    return response.json();
}


