export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory:'coverage',
    coverageReporters: ['text', 'lcov'],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 5,
            statement:5,
            lines: 5,
            function: 5
        }
    },
};
