"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginAllowed = checkLoginAllowed;
exports.registerFailedLogin = registerFailedLogin;
exports.registerSuccessfulLogin = registerSuccessfulLogin;
exports.loginRateLimitResponse = loginRateLimitResponse;
const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_WINDOW_MS = 1 * 60 * 1000;
const DEFAULT_COOLDOWN_MS = 1 * 60 * 1000;
const attempts = new Map();
function readPositiveNumber(name, fallback) {
    const value = Number(process.env[name]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
}
const maxAttempts = readPositiveNumber("LOGIN_MAX_ATTEMPTS", DEFAULT_MAX_ATTEMPTS);
const windowMs = readPositiveNumber("LOGIN_WINDOW_MS", DEFAULT_WINDOW_MS);
const cooldownMs = readPositiveNumber("LOGIN_COOLDOWN_MS", DEFAULT_COOLDOWN_MS);
function getKey(email) {
    const normalizedEmail = email.trim().toLowerCase();
    return `account:${normalizedEmail}`;
}
function getRecord(key, now) {
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
function getRetryAfterSeconds(blockedUntil, now) {
    return Math.max(1, Math.ceil((blockedUntil - now) / 1000));
}
function checkLoginAllowed(email) {
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
function registerFailedLogin(email) {
    const now = Date.now();
    const record = getRecord(getKey(email), now);
    record.count += 1;
    if (record.count >= maxAttempts) {
        record.blockedUntil = now + cooldownMs;
    }
}
function registerSuccessfulLogin(email) {
    attempts.delete(getKey(email));
}
function loginRateLimitResponse(response, retryAfterSeconds) {
    response.setHeader("Retry-After", retryAfterSeconds);
    return response.status(429).json({
        status: "error",
        message: "Muitas tentativas de login. Tente novamente mais tarde.",
    });
}
//# sourceMappingURL=loginSecurity.js.map