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
            branches: 80,
            statement:80,
            lines: 80,
            function: 80
        }
    },
};
