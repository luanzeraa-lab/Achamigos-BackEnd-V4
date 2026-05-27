export default {
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
        '[\\/]controllers[\\/](?!AnimalController\\.ts$|EventoController\\.ts$|UserController\\.ts$)',
    ],
    coverageDirectory:'coverage',
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
<<<<<<< HEAD
            branches: 5,
            statements: 5,
            lines: 5,
            functions: 5
=======
            branches: 80,
            statements: 80,
            lines: 80,
            functions: 80
>>>>>>> feature/testes
        }
    },
    // Normalize paths for SonarQube (Windows compatibility)
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                sourceMap: true
            }
        }]
    },
};