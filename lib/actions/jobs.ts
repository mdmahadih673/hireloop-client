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
    await (response.ok || response.text().catch(() => "").then((details) => {
        throw new Error(details || `Could not publish job (HTTP ${response.status}).`);
    }));

    const result: { acknowledged?: boolean } = await response.json();
    result.acknowledged !== false || (() => { throw new Error("The job was not saved. Please try again.") })();
    return result;
}

export const deleteJob = async (jobId: string) => {
    const response = await fetch(`${baseUrl}/jobs/${jobId}`, {
        method: 'DELETE',
    });
    return response.json();
}
