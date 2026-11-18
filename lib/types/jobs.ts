/** Fields shared by the create and update job forms. */
export type JobFormData = {
  _id?: string
  title: string
  companyName: string
  companyId?: string
  recruiterId: string,
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
}

/** Job shape returned by the jobs API. */
export type StoredJob = JobFormData & {
  _id: string
  createdAt?: string
}
