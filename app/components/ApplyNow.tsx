"use client"

import { useSession } from '@/lib/auth-client';
import { JobFormData } from '@/lib/types/jobs';
import { useRouter } from 'next/navigation';

const ApplyNowPage = ({jobs}: {jobs: JobFormData[]}) => {
    const router = useRouter()
    const { data: session, isPending } = useSession()
    const user = session?.user

    const handelApplyNow = () => {
        if (!user) {
            router.push(`/sign-in?redirect=/browse-jobs/${jobs[0]._id}`)
            return
        }
    }
    return (
        <div>
            <button
                onClick={handelApplyNow}
                className="rounded-lg cursor-pointer bg-white px-4 py-2.5 text-xs font-semibold text-[#09090b] transition hover:bg-white/90"
                type="button"
            >
                Apply Now
            </button>
        </div>
    );
};

export default ApplyNowPage;