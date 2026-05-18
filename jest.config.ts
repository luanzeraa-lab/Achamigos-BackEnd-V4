export default {
    preset: "ts-jest",
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    collectCoverageFrom: [
        'controllers/AnimalController.ts',
        'controllers/EventoController.ts',
        'controllers/UserController.ts',
    ],
    coveragePathIgnorePatterns: [
        '[\\/]controllers[\\/](?!AnimalController\\.ts$|EventoController\\.ts$|UserController\\.ts$)',
    ],
    coverageDirectory:'coverage',
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            statements: 80,
            lines: 80,
            functions: 80
        }
    },
};
