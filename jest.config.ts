export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverageDirectory:'coverage',
    coverageReporters: ['text', 'lcov'],
    collectCoverage: true,
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
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
            branches: 5,
            statements:5,
            lines: 5,
            functions: 5
        }
    },
};