declare const _default: {
    preset: string;
    testEnvironment: string;
    testMatch: string[];
    clearMocks: boolean;
    restoreMocks: boolean;
    coverageDirectory: string;
    coverageReporters: string[];
    collectCoverage: boolean;
    modulePathIgnorePatterns: string[];
    collectCoverageFrom: string[];
    coveragePathIgnorePatterns: string[];
    testPathIgnorePatterns: string[];
    coverageThreshold: {
        global: {
            branches: number;
            statements: number;
            lines: number;
            functions: number;
        };
    };
    transform: {
        '^.+\\.tsx?$': (string | {
            tsconfig: {
                sourceMap: boolean;
            };
        })[];
    };
};
export default _default;
//# sourceMappingURL=jest.config.d.ts.map