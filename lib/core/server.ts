import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getSesson = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
}

const dashboardByRole: Record<string, string> = {
    admin: "/Dashboard/Admin",
    recruiter: "/Dashboard/Recruiter",
    seeker: "/Dashboard/Seeker",
}

export async function requireRole(role: "admin" | "recruiter" | "seeker", returnTo: string) {
    const session = await getSesson()
    if (!session?.user) {
        redirect(`/sign-in?redirect=${encodeURIComponent(returnTo)}`)
    }

    const actualRole = session.user.role?.toLowerCase() ?? ""
    if (actualRole !== role) {
        redirect(dashboardByRole[actualRole] ?? "/")
    }

    return session
}
