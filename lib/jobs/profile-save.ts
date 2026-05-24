export type ProfileSaveJobStatus = "pending" | "processing" | "success" | "error";

export interface ProfileSaveJob {
  id: string;
  did: string;
  status: ProfileSaveJobStatus;
  createdAt: string;
  updatedAt: string;
  counts?: {
    names: number;
    pronouns: number;
  };
  error?: string;
}

export interface ProfileJobStore {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
}

const JOB_TTL_SECONDS = 60 * 60;
const JOB_PREFIX = "profile-save:";

export function getProfileSaveJobKey(jobId: string) {
  return `${JOB_PREFIX}${jobId}`;
}

export async function loadProfileSaveJob(
  store: ProfileJobStore,
  jobId: string,
): Promise<ProfileSaveJob | null> {
  const raw = await store.get(getProfileSaveJobKey(jobId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProfileSaveJob;
  } catch {
    return null;
  }
}

export async function saveProfileSaveJob(
  store: ProfileJobStore,
  job: ProfileSaveJob,
) {
  await store.put(getProfileSaveJobKey(job.id), JSON.stringify(job), {
    expirationTtl: JOB_TTL_SECONDS,
  });
}
