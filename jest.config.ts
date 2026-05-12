export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory:'coverage',
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 10,
            statement:10,
            lines: 10,
            function: 10
        }
    },
};
