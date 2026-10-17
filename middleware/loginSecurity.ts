interface LoginAttemptRecord {
  count: number;
  windowStartedAt: number;
  blockedUntil: number;
}

interface LoginSecurityResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_WINDOW_MS = 1 * 60 * 1000;
const DEFAULT_COOLDOWN_MS = 1 * 60 * 1000;

const attempts = new Map<string, LoginAttemptRecord>();

function readPositiveNumber(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

const maxAttempts = readPositiveNumber("LOGIN_MAX_ATTEMPTS", DEFAULT_MAX_ATTEMPTS);
const windowMs = readPositiveNumber("LOGIN_WINDOW_MS", DEFAULT_WINDOW_MS);
const cooldownMs = readPositiveNumber("LOGIN_COOLDOWN_MS", DEFAULT_COOLDOWN_MS);

function getKey(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();

  return `account:${normalizedEmail}`;
}

function getRecord(key: string, now: number): LoginAttemptRecord {
  const current = attempts.get(key);

  if (!current || now - current.windowStartedAt >= windowMs) {
    const freshRecord = {
      count: 0,
      windowStartedAt: now,
      blockedUntil: 0,
    };
    attempts.set(key, freshRecord);
    return freshRecord;
  }

  return current;
}

function getRetryAfterSeconds(blockedUntil: number, now: number): number {
  return Math.max(1, Math.ceil((blockedUntil - now) / 1000));
}

export function checkLoginAllowed(
  email: string,
): LoginSecurityResult {
  const now = Date.now();
  const record = getRecord(getKey(email), now);

  if (record.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: getRetryAfterSeconds(record.blockedUntil, now),
    };
  }

  return { allowed: true };
}

export function registerFailedLogin(email: string): void {
  const now = Date.now();
  const record = getRecord(getKey(email), now);
  record.count += 1;

  if (record.count >= maxAttempts) {
    record.blockedUntil = now + cooldownMs;
  }
}

export function registerSuccessfulLogin(email: string): void {
  attempts.delete(getKey(email));
}

export function loginRateLimitResponse(
  response: {
    setHeader(name: string, value: string | number): void;
    status(code: number): { json(body: object): unknown };
  },
  retryAfterSeconds: number,
): unknown {
  response.setHeader("Retry-After", retryAfterSeconds);
  return response.status(429).json({
    status: "error",
    message: "Muitas tentativas de login. Tente novamente mais tarde.",
  });
}
