"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    collectCoverage: true,
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: [
        'controllers/**/*.ts',
        'models/**/*.ts',
        'services/**/*.ts',
        'routes/**/*.ts',
        'middleware/**/*.ts',
        'utils/**/*.ts',
        'config/**/*.ts',
        'api.ts'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/coverage/',
        'swagger.ts',
        '.spec.ts',
        '.test.ts',
        '.test.js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/'
    ],
    coverageThreshold: {
        global: {
            branches: 5,
            statements: 5,
            lines: 5,
            functions: 5
        }
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
                tsconfig: {
                    sourceMap: true
                }
            }]
    },
};
//# sourceMappingURL=jest.config.js.map