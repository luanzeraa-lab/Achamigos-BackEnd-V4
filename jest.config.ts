export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        'controllers/**/*.ts',
        'models/**/*.ts',
        'services/**/*.ts'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        'swagger.ts',
        'api.ts',
        '.spec.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 10,
            statements: 10,
            lines: 10,
            functions: 10
        }
    },
};