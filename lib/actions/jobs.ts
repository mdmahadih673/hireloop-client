import type { JobFormData } from "@/lib/types/jobs";
import type { ApplicationStatus, JobApplication } from "@/lib/types/applications";
import { CreateJobApplication } from "../types/applications";

export type { JobFormData, StoredJob } from "@/lib/types/jobs";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const BASE_URL = typeof window === 'undefined' ? BACKEND_URL : '/api/backend';

export interface JobData {
    [key: string]: unknown;
}

async function parseJsonOrThrow(response: Response, fallbackMessage: string) {
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
        throw new Error(`${fallbackMessage} (HTTP ${response.status}).`);
    }
    return response.json();
}

export const createJob = async (jobData: JobFormData) => {
    const response = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(jobData),
    });
    if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string; message?: string } | null;
        throw new Error(body?.error || body?.message || `Could not publish job (HTTP ${response.status}).`);
    }

    const result: { acknowledged?: boolean } = await response.json();
    if (result.acknowledged === false) {
        throw new Error("The job was not saved. Please try again.");
    }
    return result;
}

export const getRecruiterJobCount = async (): Promise<{ count: number }> => {
    const response = await fetch(`${BASE_URL}/jobs/count`, {
        cache: 'no-store',
        credentials: 'include',
    });
    if (!response.ok) throw new Error("Could not check your job post limit.");
    return response.json();
}

export const deleteJob = async (jobId: string) => {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return parseJsonOrThrow(response, "Could not delete the job post.");
}

export async function applyToAJob({data}:{data:CreateJobApplication}) {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    return parseJsonOrThrow(res, "Could not submit your application.");
}

export const getApplicationsByUser = async (_query= ''): Promise<JobApplication[]> => {
    const response = await fetch(`${BASE_URL}/applications`, {
        cache: 'no-store',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Could not load your applications.");
    }
    return response.json();
}

export const getApplicationsByJobId = async (jobId: string, cookie?: string): Promise<JobApplication[]> => {
    const response = await fetch(`${BASE_URL}/applications?jobId=${encodeURIComponent(jobId)}`, {
        headers: cookie ? { cookie } : undefined,
        cache: 'no-store',
    });
    if (!response.ok) throw new Error("Could not load applicants for this job.");
    return response.json();
}

export const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    const response = await fetch(`${BASE_URL}/applications/${encodeURIComponent(applicationId)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
    });
    if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(body?.error || "Could not update applicant status.");
    }
    return response.json() as Promise<{ success: boolean; status: ApplicationStatus }>;
}

export const getApplicationCountsByJobIds = async (jobIds: string[], cookie?: string): Promise<Record<string, number>> => {
    if (jobIds.length === 0) return {};
    const params = new URLSearchParams({ jobIds: jobIds.join(",") });
    const response = await fetch(`${BASE_URL}/applications/counts?${params}`, {
        headers: cookie ? { cookie } : undefined,
        cache: 'no-store',
    });
    if (!response.ok) throw new Error("Could not load applicant counts.");
    const result = await response.json() as { counts: Record<string, number> };
    return result.counts;
}

export const getApplicationsCount = async (query= ''): Promise<{count : number}> => {
    const search = query ? `?${query}` : '';
    const response = await fetch(`${BASE_URL}/applications/count${search}`, {
        cache: 'no-store',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Could not load your applications.");
    }
    return response.json();
}

// payment api

export const checkoutVerify=async (sessionId : string, cookie: string)=>{
    const res = await fetch(`${BASE_URL}/payment/checkout-verify`,{
        method:'POST',
        headers:{
           'Content-Type': 'application/json',
           cookie,
        },
        body: JSON.stringify({ sessionId })
    })
    return parseJsonOrThrow(res, "Could not verify your payment.");
}

// getPremimunUserById
export const getPremimunUserById = async(userId : string)=>{
    const res = await fetch(`${BASE_URL}/users/${userId}/premimun`, { credentials: 'include' })
    return res.json()
}
