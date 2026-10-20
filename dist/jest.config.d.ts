declare const _default: {
    preset: string;
    testEnvironment: string;
    testMatch: string[];
    clearMocks: boolean;
    restoreMocks: boolean;
    collectCoverageFrom: string[];
    coveragePathIgnorePatterns: string[];
    coverageDirectory: string;
    collectCoverage: boolean;
    modulePathIgnorePatterns: string[];
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