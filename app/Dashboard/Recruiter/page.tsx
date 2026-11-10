import React from 'react';
import Link from 'next/link';

const RecruiterDashboardPage = () => {
    return (
        <div className="min-h-svh bg-[#08080a] px-6 py-8 text-white">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">Recruiter Dashboard</h1>
                <Link
                    className="rounded-lg bg-[#6653ff] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#7969ff]"
                    href="/dashboard/Recruiter/job/new"
                >
                    Create Job Post
                </Link>
            </div>
        </div>
    );
};

export default RecruiterDashboardPage;
