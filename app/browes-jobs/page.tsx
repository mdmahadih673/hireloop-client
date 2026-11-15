import { listJobs } from '@/lib/api/jobs';
import React from 'react';

const AllJobsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const search = await searchParams;
    const urlSearchParams = new URLSearchParams(search as Record<string, string>);

    const jobs = await listJobs(Object.fromEntries(urlSearchParams.entries()) as Parameters<typeof listJobs>[0]);
    return (
        <div>

        </div>
    );
};

export default AllJobsPage;