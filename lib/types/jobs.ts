/** Fields shared by the create and update job forms. */
export type JobFormData = {
  title: string
  companyName: string
  category: string
  jobType: string
  location: string
  deadline: string
  isRemote: boolean
  minSalary: string
  maxSalary: string
  frequency: string
  description: string
  requirements: string
  status?: string
  _id: string
}

/** Job shape returned by the jobs API. */
export type StoredJob = JobFormData & {
  createdAt?: string
}
