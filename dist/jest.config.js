"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverageFrom: [
        'controllers/AnimalController.ts',
        'controllers/EventoController.ts',
        'controllers/UserController.ts',
    ],
    coveragePathIgnorePatterns: [
        String.raw `[\/]controllers[\/](?!AnimalController\.ts$|EventoController\.ts$|UserController\.ts$)`,
    ],
    coverageDirectory: 'coverage',
    collectCoverage: true,
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            statements: 80,
            lines: 80,
            functions: 80
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