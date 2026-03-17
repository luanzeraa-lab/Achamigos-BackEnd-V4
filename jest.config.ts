export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory:'coverage',
    collectCoverage: true,
};
