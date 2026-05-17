export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
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
            statement:5,
            lines: 5,
            function: 5
        }
    },
};