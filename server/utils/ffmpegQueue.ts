import { exec } from "child_process";

const MAX_CONCURRENT = Math.max(1, Number(process.env.FFMPEG_CONCURRENCY || 1));
const DEFAULT_TIMEOUT_MS = Math.max(30000, Number(process.env.FFMPEG_TIMEOUT_MS || 180000));

let activeCount = 0;
const waitQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
  if (activeCount < MAX_CONCURRENT) {
    activeCount++;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    waitQueue.push(() => {
      activeCount++;
      resolve();
    });
  });
}

function releaseSlot(): void {
  activeCount = Math.max(0, activeCount - 1);
  const next = waitQueue.shift();
  if (next) next();
}

export async function runFfmpeg(command: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<{ stdout: string; stderr: string }> {
  await acquireSlot();
  try {
    return await new Promise((resolve, reject) => {
      exec(
        command,
        { timeout: timeoutMs, maxBuffer: 5 * 1024 * 1024, killSignal: "SIGKILL" },
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve({ stdout, stderr });
          }
        }
      );
    });
  } finally {
    releaseSlot();
  }
}

export function getFfmpegThreads(): string {
  return String(Math.max(1, Number(process.env.FFMPEG_THREADS || 2)));
}

export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 30000
): Promise<Response> {
  const signal = init.signal ?? AbortSignal.timeout(timeoutMs);
  return fetch(url, { ...init, signal });
}
