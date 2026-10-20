interface LoginSecurityResult {
    allowed: boolean;
    retryAfterSeconds?: number;
}
export declare function checkLoginAllowed(email: string): LoginSecurityResult;
export declare function registerFailedLogin(email: string): void;
export declare function registerSuccessfulLogin(email: string): void;
export declare function loginRateLimitResponse(response: {
    setHeader(name: string, value: string | number): void;
    status(code: number): {
        json(body: object): unknown;
    };
}, retryAfterSeconds: number): unknown;
export {};
//# sourceMappingURL=loginSecurity.d.ts.map