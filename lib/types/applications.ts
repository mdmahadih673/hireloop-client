export type ApplicationStatus =
  | "applied"
  | "review"
  | "shortlisted"
  | "interview"
  | "rejected"
  | "offered"

export type JobApplication = {
  _id?: string
  jobId: string
  userId: string
  applicantName: string
  applicantEmail: string
  jobTitle: string
  companyName: string
  jobType: string
  location: string
  isRemote: boolean
  status: ApplicationStatus
  appliedAt: string
  archived?: boolean
}

export type CreateJobApplication = Pick<
  JobApplication,
  | "jobId"
  | "userId"
  | "applicantName"
  | "applicantEmail"
  | "jobTitle"
  | "companyName"
  | "jobType"
  | "location"
  | "isRemote"
>
